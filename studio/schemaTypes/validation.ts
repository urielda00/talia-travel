const httpUrlPattern = /^https?:\/\//i

export function isBlank(value: unknown) {
  return typeof value !== 'string' || value.trim().length === 0
}

export function hasMeaningfulPortableText(value: unknown) {
  if (!Array.isArray(value)) return false

  return value.some(
    (block) =>
      typeof block === 'object' &&
      block !== null &&
      Array.isArray((block as {children?: unknown[]}).children) &&
      (block as {children: unknown[]}).children.some(
        (child) =>
          typeof child === 'object' &&
          child !== null &&
          !isBlank((child as {text?: unknown}).text),
      ),
  )
}

export function isValidDate(value: unknown): value is string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false

  const date = new Date(`${value}T00:00:00Z`)
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
}

export function hasImageAsset(value: unknown) {
  return (
    typeof value === 'object' &&
    value !== null &&
    'asset' in value &&
    Boolean((value as {asset?: unknown}).asset)
  )
}

export function parentHasImageAsset(value: unknown) {
  return (
    typeof value === 'object' &&
    value !== null &&
    hasImageAsset((value as {image?: unknown}).image)
  )
}

export function isHttpUrl(value: unknown) {
  if (typeof value !== 'string' || !httpUrlPattern.test(value)) return false

  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

export function isYouTubeUrl(value: unknown) {
  if (!isHttpUrl(value) || typeof value !== 'string') return false

  const url = new URL(value)
  const host = url.hostname.toLowerCase().replace(/^www\./, '')

  if (host === 'youtu.be') return url.pathname.length > 1
  if (host !== 'youtube.com') return false

  if (url.pathname === '/watch') return Boolean(url.searchParams.get('v'))
  return /^\/shorts\/[^/]+\/?$/.test(url.pathname)
}
