import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_workshops_status" AS ENUM('published', 'draft');
  CREATE TYPE "public"."enum_content_library_items_status" AS ENUM('published', 'draft');
  CREATE TYPE "public"."enum_whats_happening_here_status" AS ENUM('published', 'draft');
  ALTER TABLE "workshops" ADD COLUMN "status" "enum_workshops_status" DEFAULT 'published' NOT NULL;
  ALTER TABLE "content_library_items" ADD COLUMN "status" "enum_content_library_items_status" DEFAULT 'published' NOT NULL;
  ALTER TABLE "whats_happening_here" ADD COLUMN "status" "enum_whats_happening_here_status" DEFAULT 'published' NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "workshops" DROP COLUMN "status";
  ALTER TABLE "content_library_items" DROP COLUMN "status";
  ALTER TABLE "whats_happening_here" DROP COLUMN "status";
  DROP TYPE "public"."enum_workshops_status";
  DROP TYPE "public"."enum_content_library_items_status";
  DROP TYPE "public"."enum_whats_happening_here_status";`)
}
