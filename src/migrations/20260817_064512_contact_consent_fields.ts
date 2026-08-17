import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "contact_submissions" ADD COLUMN "privacy_consent" boolean DEFAULT false;
  ALTER TABLE "contact_submissions" ADD COLUMN "marketing_consent" boolean DEFAULT false;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "contact_submissions" DROP COLUMN "privacy_consent";
  ALTER TABLE "contact_submissions" DROP COLUMN "marketing_consent";`)
}
