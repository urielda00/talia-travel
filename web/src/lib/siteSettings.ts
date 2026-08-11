import type { SiteSettings } from '../types/sanity'

export type ContactSocialSettings = Required<Pick<
  SiteSettings,
  'whatsappNumber' | 'instagramUrl' | 'facebookUrl'
>>

export const FALLBACK_CONTACT_SOCIAL_SETTINGS: ContactSocialSettings = {
  whatsappNumber: '052-439-8419',
  instagramUrl: 'https://instagram.com',
  facebookUrl: 'https://facebook.com',
}

export function withContactSocialFallbacks(
  settings: Partial<ContactSocialSettings> | null,
): ContactSocialSettings {
  return {
    whatsappNumber: settings?.whatsappNumber?.trim() || FALLBACK_CONTACT_SOCIAL_SETTINGS.whatsappNumber,
    instagramUrl: settings?.instagramUrl?.trim() || FALLBACK_CONTACT_SOCIAL_SETTINGS.instagramUrl,
    facebookUrl: settings?.facebookUrl?.trim() || FALLBACK_CONTACT_SOCIAL_SETTINGS.facebookUrl,
  }
}
