export function formatTripDate(value: string) {
  return new Intl.DateTimeFormat('he-IL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${value}T12:00:00`))
}

export function formatTripDateRange(startDate: string, endDate: string) {
  return `${formatTripDate(startDate)} – ${formatTripDate(endDate)}`
}

export function getTripDuration(startDate: string, endDate: string) {
  const start = new Date(`${startDate}T00:00:00Z`).getTime()
  const end = new Date(`${endDate}T00:00:00Z`).getTime()
  return Math.max(1, Math.round((end - start) / 86_400_000) + 1)
}

export function formatPrice(price: number, currency: string) {
  const currencyCode = currency.trim().toUpperCase()
  try {
    return new Intl.NumberFormat('he-IL', {
      style: 'currency',
      currency: currencyCode,
      maximumFractionDigits: 0,
    }).format(price)
  } catch {
    return `${new Intl.NumberFormat('he-IL').format(price)} ${currency}`
  }
}

export function getWhatsAppUrl(number?: string, message?: string) {
  if (!number) return undefined
  const digits = number.replace(/\D/g, '').replace(/^0/, '972')
  if (!digits) return undefined
  return `https://wa.me/${digits}${message ? `?text=${encodeURIComponent(message)}` : ''}`
}

export function getYouTubeId(url: string) {
  try {
    const parsed = new URL(url)
    if (parsed.hostname === 'youtu.be') return parsed.pathname.split('/').filter(Boolean)[0]
    if (parsed.pathname.startsWith('/shorts/')) return parsed.pathname.split('/')[2]
    if (parsed.pathname.startsWith('/embed/')) return parsed.pathname.split('/')[2]
    return parsed.searchParams.get('v') || undefined
  } catch {
    return undefined
  }
}
