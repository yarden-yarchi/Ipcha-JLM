import type { CollectionConfig } from 'payload'

export const WhatsHappeningHere: CollectionConfig = {
  slug: 'whats-happening-here',
  labels: {
    singular: 'מה קורה כאן',
    plural: 'מה קורה כאן',
  },
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'image',
      label: 'תמונה',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'title',
      label: 'כותרת',
      type: 'text',
      required: true,
    },
    {
      name: 'text',
      label: 'טקסט',
      type: 'textarea',
      required: true,
    },
    {
      name: 'buttonLabel',
      label: 'טקסט כפתור',
      type: 'text',
    },
    {
      name: 'buttonUrl',
      label: 'לינק כפתור',
      type: 'text',
    },
  ],
}
