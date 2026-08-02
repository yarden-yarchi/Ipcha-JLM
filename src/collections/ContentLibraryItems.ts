import type { CollectionConfig } from 'payload'

export const ContentLibraryItems: CollectionConfig = {
  slug: 'content-library-items',
  labels: {
    singular: 'פריט מאגר תכנים',
    plural: 'מאגר תכנים',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'price'],
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
      name: 'description',
      label: 'תיאור',
      type: 'textarea',
      required: true,
    },
    {
      name: 'price',
      label: 'מחיר',
      type: 'text',
      required: true,
    },
    {
      name: 'downloadUrl',
      label: 'לינק חיצוני להורדה',
      type: 'text',
      required: true,
    },
  ],
}
