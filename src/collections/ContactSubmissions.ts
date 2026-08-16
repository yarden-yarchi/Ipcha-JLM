import type { CollectionConfig } from 'payload'

import { isAdmin } from '../access/isAdmin'

const LEADS_RECIPIENT = 'Office@ipcha.org.il'

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  labels: {
    singular: 'פנייה מטופס יצירת קשר',
    plural: 'פניות מטופס יצירת קשר',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'phone', 'createdAt'],
    components: {
      edit: {
        beforeDocumentControls: ['/components/admin/BackToListButton#BackToListButton'],
      },
    },
  },
  access: {
    create: () => true,
    read: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation !== 'create') return

        try {
          await req.payload.sendEmail({
            to: LEADS_RECIPIENT,
            replyTo: doc.email,
            subject: `פנייה חדשה מהאתר - ${doc.name}`,
            html: `
              <div dir="rtl" style="font-family: sans-serif;">
                <p><strong>שם:</strong> ${escapeHtml(doc.name)}</p>
                <p><strong>טלפון:</strong> ${escapeHtml(doc.phone)}</p>
                <p><strong>מייל:</strong> ${escapeHtml(doc.email)}</p>
                <p><strong>הודעה:</strong> ${escapeHtml(doc.message)}</p>
              </div>
            `,
          })
        } catch (err) {
          req.payload.logger.error(err)
        }
      },
    ],
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
    {
      name: 'privacyConsent',
      label: 'הסכמה למדיניות הפרטיות',
      type: 'checkbox',
      defaultValue: false,
      validate: (value) => (value === true ? true : 'יש לאשר את מדיניות הפרטיות כדי לשלוח את הטופס'),
    },
    {
      name: 'marketingConsent',
      label: 'הסכמה לדיוור',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
