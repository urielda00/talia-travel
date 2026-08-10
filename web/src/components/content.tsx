import { PortableText, type PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock, SanityImage as SanityImageValue } from '../types/sanity'
import { urlForImage } from '../lib/sanity'

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h2: ({ children }) => <h3>{children}</h3>,
    h3: ({ children }) => <h3>{children}</h3>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>,
  },
  marks: {
    link: ({ children, value }) => {
      const href = typeof value?.href === 'string' ? value.href : '#'
      const external = /^https?:\/\//.test(href)
      return <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer noopener' : undefined}>{children}</a>
    },
  },
}

export function RichText({ value, className = '' }: { value?: PortableTextBlock[]; className?: string }) {
  if (!value?.length) return null
  return <div className={`rich-text ${className}`}><PortableText value={value} components={portableTextComponents} /></div>
}

type SanityImageProps = {
  image?: SanityImageValue
  alt?: string
  width?: number
  height?: number
  sizes?: string
  className?: string
  eager?: boolean
}

export function SanityImage({ image, alt, width = 1200, height, sizes = '100vw', className = '', eager = false }: SanityImageProps) {
  if (!image?.asset) return null
  const build = (requestedWidth: number) => {
    let builder = urlForImage(image).width(requestedWidth).auto('format').quality(82)
    if (height) builder = builder.height(Math.round(height * (requestedWidth / width))).fit('crop')
    return builder.url()
  }
  const candidates = [480, 768, 1200, 1600].filter((candidate) => candidate <= width)
  if (!candidates.includes(width)) candidates.push(width)
  return (
    <img
      className={className}
      src={build(width)}
      srcSet={candidates.map((candidate) => `${build(candidate)} ${candidate}w`).join(', ')}
      sizes={sizes}
      alt={alt ?? image.alt ?? ''}
      width={width}
      height={height}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : 'auto'}
      decoding="async"
    />
  )
}
