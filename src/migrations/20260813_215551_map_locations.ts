import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "map_locations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"order" numeric NOT NULL,
  	"position_x" numeric NOT NULL,
  	"position_y" numeric NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "map_locations_id" integer;
  CREATE INDEX "map_locations_updated_at_idx" ON "map_locations" USING btree ("updated_at");
  CREATE INDEX "map_locations_created_at_idx" ON "map_locations" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_map_locations_fk" FOREIGN KEY ("map_locations_id") REFERENCES "public"."map_locations"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_map_locations_id_idx" ON "payload_locked_documents_rels" USING btree ("map_locations_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "map_locations" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "map_locations" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_map_locations_fk";
  
  DROP INDEX "payload_locked_documents_rels_map_locations_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "map_locations_id";`)
}
