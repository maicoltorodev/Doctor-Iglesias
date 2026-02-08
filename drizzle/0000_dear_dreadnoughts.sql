CREATE TABLE "gallery_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer DEFAULT 0,
	"src" text NOT NULL,
	"category" text NOT NULL,
	"title" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "results" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer DEFAULT 0,
	"title" text NOT NULL,
	"case_id" text NOT NULL,
	"before_image" text NOT NULL,
	"after_image" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "services" (
	"id" serial PRIMARY KEY NOT NULL,
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
--> statement-breakpoint
CREATE TABLE "site_content" (
	"id" serial PRIMARY KEY NOT NULL,
	"section" text NOT NULL,
	"data" jsonb NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "site_content_section_unique" UNIQUE("section")
);
--> statement-breakpoint
CREATE TABLE "testimonials" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer DEFAULT 0,
	"name" text NOT NULL,
	"text" text NOT NULL,
	"treatment" text NOT NULL
);
