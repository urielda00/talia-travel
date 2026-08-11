import {defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'הגדרות האתר',
  type: 'document',
  description: 'כאן ירוכזו בהמשך ההגדרות והתכנים הכלליים של האתר.',
  fields: [],
  preview: {
    prepare() {
      return {
        title: 'הגדרות האתר',
      }
    },
  },
})
