import type { CollectionConfig } from 'payload'

import { isAdmin } from '../access/isAdmin'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'משתמש',
    plural: 'משתמשים',
  },
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    create: isAdmin,
    read: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}
