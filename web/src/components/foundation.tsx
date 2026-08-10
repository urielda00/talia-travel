import type { ButtonHTMLAttributes, HTMLAttributes, PropsWithChildren, ReactNode } from 'react'

type ContainerProps = PropsWithChildren<{
  className?: string
  narrow?: boolean
}>

export function Container({ children, className = '', narrow = false }: ContainerProps) {
  return <div className={`container${narrow ? ' container--narrow' : ''} ${className}`}>{children}</div>
}

type SectionProps = PropsWithChildren<HTMLAttributes<HTMLElement> & {
  className?: string
  fullWidth?: boolean
}>

export function Section({ children, className = '', fullWidth = false, ...props }: SectionProps) {
  return <section className={`section${fullWidth ? ' section--full-width' : ''} ${className}`} {...props}>{children}</section>
}

export function SectionHeading({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: ReactNode }) {
  return (
    <header className="section-heading">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {children && <div className="section-heading__description">{children}</div>}
    </header>
  )
}

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary'
}>

export function Button({ children, className = '', variant = 'primary', type = 'button', ...props }: ButtonProps) {
  return <button className={`button button--${variant} ${className}`} type={type} {...props}>{children}</button>
}

export function TextLink({ children, className = '', ...props }: PropsWithChildren<React.AnchorHTMLAttributes<HTMLAnchorElement>>) {
  return <a className={`text-link ${className}`} {...props}>{children}</a>
}

export function Divider() {
  return <hr className="divider" />
}
