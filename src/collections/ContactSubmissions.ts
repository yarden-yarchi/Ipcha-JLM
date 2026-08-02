import type { CollectionConfig } from 'payload'

import { isAdmin } from '../access/isAdmin'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  labels: {
    singular: 'פנייה מטופס יצירת קשר',
    plural: 'פניות מטופס יצירת קשר',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'phone', 'createdAt'],
  },
  access: {
    create: () => true,
    read: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      label: 'שם',
      type: 'text',
      required: true,
    },
    {
      name: 'phone',
      label: 'טלפון',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      label: 'מייל',
      type: 'email',
      required: true,
    },
    {
      name: 'message',
      label: 'הודעה',
      type: 'textarea',
      required: true,
    },
  ],
}
