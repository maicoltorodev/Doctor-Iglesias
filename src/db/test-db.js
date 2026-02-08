require('dotenv').config({ path: '.env.local' });
const { neon } = require('@neondatabase/serverless');

const sqlContent = `
CREATE TABLE IF NOT EXISTS "gallery_items" ("id" serial PRIMARY KEY, "order" integer, "src" text, "category" text, "title" text);
CREATE TABLE IF NOT EXISTS "results" ("id" serial PRIMARY KEY, "order" integer, "title" text, "case_id" text, "before_image" text, "after_image" text);
CREATE TABLE IF NOT EXISTS "services" ("id" serial PRIMARY KEY, "order" integer, "label" text, "slug" text, "description" text, "image" text, "specs" jsonb, "benefits" jsonb, "faqs" jsonb, "updated_at" timestamp DEFAULT now());
CREATE TABLE IF NOT EXISTS "site_content" ("id" serial PRIMARY KEY, "section" text UNIQUE, "data" jsonb, "updated_at" timestamp DEFAULT now());
CREATE TABLE IF NOT EXISTS "testimonials" ("id" serial PRIMARY KEY, "order" integer, "name" text, "text" text, "treatment" text);
`;

async function main() {
    const dbUrl = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;
    const sql = neon(dbUrl);

    console.log("🚀 Creating tables...");
    const statements = sqlContent.split(';').map(s => s.trim()).filter(s => s);
    for (const s of statements) {
        await sql(s);
    }
    console.log("✅ Tables created.");

    // Simple seed for verification
    console.log("🌱 Inserting test content...");
    await sql('INSERT INTO site_content (section, data) VALUES ($1, $2) ON CONFLICT (section) DO NOTHING', ['test', { hello: 'world' }]);
    console.log("✅ Seed OK");
}

main().catch(console.error);
