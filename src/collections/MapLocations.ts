import type { CollectionConfig, NumberFieldSingleValidation, PayloadRequest } from 'payload'

import { isAdmin } from '../access/isAdmin'
import { revalidatePaths } from './hooks/revalidatePaths'

const revalidate = revalidatePaths(['/partners'])

const getNextOrder = async (req: PayloadRequest) => {
  const result = await req.payload.find({
    collection: 'map-locations',
    sort: '-order',
    limit: 1,
    depth: 0,
  })
  const maxOrder = (result.docs[0] as { order?: number } | undefined)?.order ?? 0
  return maxOrder + 1
}

const validateOrder: NumberFieldSingleValidation = async (value, { req, id }) => {
  if (typeof value !== 'number') return 'שדה חובה'
  const { totalDocs } = await req.payload.count({ collection: 'map-locations' })
  const maxAllowed = id ? totalDocs : totalDocs + 1
  if (value < 1) return 'המספר חייב להיות לפחות 1'
  if (value > maxAllowed) return `לא ניתן להזין מספר גדול מ-${maxAllowed} (המספר הבא בתור)`
  return true
}

export const MapLocations: CollectionConfig = {
  slug: 'map-locations',
  labels: {
    singular: 'מיקום על המפה',
    plural: 'מיקומים על המפה',
  },
  defaultSort: 'order',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'order'],
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
      name: 'order',
      label: 'מספר סידורי',
      type: 'number',
      required: true,
      min: 1,
      defaultValue: (async ({ req }: { req: PayloadRequest }) => getNextOrder(req)) as unknown as number,
      validate: validateOrder,
      admin: {
        description: 'קובע את המספר על הסימון במפה ואת סדר ההופעה ברשימה',
      },
    },
    {
      name: 'position',
      label: 'מיקום על המפה',
      type: 'group',
      admin: {
        components: {
          Field: '/components/admin/MapPositionField#MapPositionField',
        },
      },
      fields: [
        {
          name: 'x',
          type: 'number',
          required: true,
          min: 0,
          max: 100,
        },
        {
          name: 'y',
          type: 'number',
          required: true,
          min: 0,
          max: 100,
        },
      ],
    },
  ],
}
