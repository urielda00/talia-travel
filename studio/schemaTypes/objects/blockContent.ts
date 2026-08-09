import {defineArrayMember, defineType} from 'sanity'

export const blockContent = defineType({
  name: 'blockContent',
  title: 'תוכן עשיר פשוט',
  type: 'array',
  of: [defineArrayMember({type: 'block'})],
})
