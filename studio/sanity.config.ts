import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {SINGLETON_TYPES, structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'talia-travels',

  projectId: '8t81vkab',
  dataset: 'production',

  plugins: [structureTool({structure}), visionTool()],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter((template) => !SINGLETON_TYPES.has(template.schemaType)),
  },

  document: {
    actions: (actions, {schemaType}) =>
      SINGLETON_TYPES.has(schemaType)
        ? actions.filter(
            ({action}) => action !== 'delete' && action !== 'duplicate' && action !== 'unpublish',
          )
        : actions,
    newDocumentOptions: (options) =>
      options.filter((option) => !SINGLETON_TYPES.has(option.templateId)),
  },
})
