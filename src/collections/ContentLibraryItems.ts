import type { CollectionConfig } from 'payload'

import { isAdmin } from '../access/isAdmin'
import { revalidatePaths } from './hooks/revalidatePaths'

const revalidate = revalidatePaths(['/content-library'])

export const ContentLibraryItems: CollectionConfig = {
  slug: 'content-library-items',
  labels: {
    singular: 'פריט מאגר תכנים',
    plural: 'מאגר תכנים',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'price'],
    components: {
      edit: {
        beforeDocumentControls: ['/components/admin/BackToListButton#BackToListButton'],
      },
    },
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  hooks: {
    afterChange: [revalidate.afterChange],
    afterDelete: [revalidate.afterDelete],
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
      admin: {
        components: {
          Field: '/components/admin/LargeTitleField#LargeTitleField',
        },
      },
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
