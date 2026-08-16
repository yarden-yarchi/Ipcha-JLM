import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { s3Storage } from '@payloadcms/storage-s3'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { he } from '@payloadcms/translations/languages/he'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Workshops } from './collections/Workshops'
import { ContentLibraryItems } from './collections/ContentLibraryItems'
import { WhatsHappeningHere } from './collections/WhatsHappeningHere'
import { MapLocations } from './collections/MapLocations'
import { ContactSubmissions } from './collections/ContactSubmissions'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// SMTP email delivery (contact form leads). Only enabled once SMTP env vars are set —
// falls back to Payload's default console-logging behavior in dev otherwise.
const emailAdapter = process.env.SMTP_HOST
  ? await nodemailerAdapter({
      defaultFromAddress: process.env.SMTP_FROM || 'noreply@ipcha.org.il',
      defaultFromName: 'איפכא',
      transportOptions: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER || '',
          pass: process.env.SMTP_PASS || '',
        },
      },
    })
  : undefined

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      graphics: {
        Logo: '/components/admin/Logo#Logo',
        Icon: '/components/admin/Icon#Icon',
      },
      header: [
        '/components/admin/ViewSiteLink#ViewSiteLink',
        '/components/admin/AdminTheme#AdminTheme',
      ],
    },
    meta: {
      icons: [
        {
          type: 'image/svg+xml',
          url: '/favicon.svg',
        },
      ],
    },
  },
  routes: {
    admin: '/admin-dashboard',
  },
  i18n: {
    supportedLanguages: { he },
    fallbackLanguage: 'he',
  },
  collections: [
    Users,
    Media,
    Workshops,
    ContentLibraryItems,
    WhatsHappeningHere,
    MapLocations,
    ContactSubmissions,
  ],
  editor: lexicalEditor(),
  email: emailAdapter,
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [
    // Cloudflare R2 (S3-compatible) storage for uploaded media.
    // Only enabled once R2 env vars are set — falls back to local disk storage in dev otherwise.
    ...(process.env.S3_BUCKET
      ? [
          s3Storage({
            collections: {
              media: true,
            },
            bucket: process.env.S3_BUCKET,
            config: {
              endpoint: process.env.S3_ENDPOINT,
              region: 'auto',
              credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
              },
            },
          }),
        ]
      : []),
  ],
})
