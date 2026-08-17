import type { CollectionConfig } from 'payload'

import { isAdmin } from '../access/isAdmin'
import { revalidatePaths } from './hooks/revalidatePaths'

const revalidate = revalidatePaths(['/partners'])

export const WhatsHappeningHere: CollectionConfig = {
  slug: 'whats-happening-here',
  labels: {
    singular: 'מה קורה כאן',
    plural: 'מה קורה כאן',
  },
  admin: {
    useAsTitle: 'title',
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
