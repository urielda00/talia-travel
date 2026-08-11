import type {StructureResolver} from 'sanity/structure'

export const SITE_SETTINGS_ID = 'siteSettings'
export const SINGLETON_TYPES = new Set(['siteSettings'])

export const structure: StructureResolver = (S) =>
  S.list()
    .id('content')
    .title('תוכן האתר')
    .items([
      S.documentTypeListItem('trip').id('trips').title('טיולים'),
      S.listItem()
        .id('siteSettings')
        .title('הגדרות האתר')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId(SITE_SETTINGS_ID)
            .title('הגדרות האתר'),
        ),
    ])
