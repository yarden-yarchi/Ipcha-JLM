import type { CollectionConfig } from 'payload'

import { isAdmin } from '../access/isAdmin'

export const Workshops: CollectionConfig = {
  slug: 'workshops',
  labels: {
    singular: 'סדנה',
    plural: 'סדנאות',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'location'],
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
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
      name: 'preTitle',
      label: 'כותרת על',
      type: 'text',
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
      name: 'date',
      label: 'תאריך',
      type: 'date',
      required: true,
    },
    {
      name: 'hours',
      label: 'שעות',
      type: 'text',
    },
    {
      name: 'location',
      label: 'מיקום',
      type: 'text',
    },
    {
      name: 'signupUrl',
      label: 'לינק חיצוני להרשמה',
      type: 'text',
      required: true,
    },
    {
      name: 'bubbleText',
      label: 'בועה',
      type: 'text',
      maxLength: 40,
    },
  ],
}
