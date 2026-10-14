import type { CollectionConfig } from 'payload'

import { isAdmin } from '../access/isAdmin'
import { revalidatePaths } from './hooks/revalidatePaths'

const revalidate = revalidatePaths(['/partners'])

export const WhatsHappeningHere: CollectionConfig = {
  slug: 'whats-happening-here',
  labels: {
    singular: 'שותפים ותכניות',
    plural: 'שותפים ותכניות',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status'],
    components: {
      edit: {
        beforeDocumentControls: [
          '/components/admin/BackToListButton#BackToListButton',
          '/components/admin/LivePreview#WhatsHappeningLivePreview',
        ],
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
      name: 'status',
      label: 'סטטוס',
      type: 'select',
      options: [
        { label: 'פורסם', value: 'published' },
        { label: 'טיוטה', value: 'draft' },
      ],
      defaultValue: 'published',
      required: true,
      admin: {
        position: 'sidebar',
        components: {
          Cell: '/components/admin/StatusCell#StatusCell',
        },
      },
    },
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
