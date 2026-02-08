require('dotenv').config({ path: '.env.local' });
const { neon } = require('@neondatabase/serverless');

const sqlContent = `
DROP TABLE IF EXISTS "gallery_items";
DROP TABLE IF EXISTS "results";
DROP TABLE IF EXISTS "services";
DROP TABLE IF EXISTS "site_content";
DROP TABLE IF EXISTS "testimonials";

CREATE TABLE "gallery_items" (
	"id" serial PRIMARY KEY,
	"order" integer DEFAULT 0,
	"src" text NOT NULL,
	"category" text NOT NULL,
	"title" text NOT NULL
);
CREATE TABLE "results" (
	"id" serial PRIMARY KEY,
	"order" integer DEFAULT 0,
	"title" text NOT NULL,
	"case_id" text NOT NULL,
	"before_image" text NOT NULL,
	"after_image" text NOT NULL
);
CREATE TABLE "services" (
	"id" serial PRIMARY KEY,
	"order" integer DEFAULT 0,
	"label" text NOT NULL,
	"slug" text NOT NULL,
	"description" text NOT NULL,
	"image" text NOT NULL,
	"specs" jsonb NOT NULL,
	"benefits" jsonb NOT NULL,
	"faqs" jsonb NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "services_slug_unique" UNIQUE("slug")
);
CREATE TABLE "site_content" (
	"id" serial PRIMARY KEY,
	"section" text NOT NULL,
	"data" jsonb NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "site_content_section_unique" UNIQUE("section")
);
CREATE TABLE "testimonials" (
	"id" serial PRIMARY KEY,
	"order" integer DEFAULT 0,
	"name" text NOT NULL,
	"text" text NOT NULL,
	"treatment" text NOT NULL
);
`;

async function main() {
	const dbUrl = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;
	if (!dbUrl) throw new Error("No DATABASE_URL");

	const sql = neon(dbUrl);
	console.log("🚀 Refreshing tables...");

	const statements = sqlContent.split(';').map(s => s.trim()).filter(s => s);
	for (const s of statements) {
		console.log("⏳ Executing SQL...");
		await sql.query(s);
	}
	console.log("✅ Tables refreshed!");
}

main().catch(err => {
	console.error("❌ Fatal error:", err);
	process.exit(1);
});
