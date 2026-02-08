import { pgTable, text, serial, timestamp, integer, jsonb, boolean } from "drizzle-orm/pg-core";

// 1. Contenido Editorial (General y Secciones)
// Guardamos los bloques de texto grandes como JSON para flexibilidad
export const siteContent = pgTable("site_content", {
    id: serial("id").primaryKey(),
    section: text("section").unique().notNull(), // e.g., 'hero', 'about', 'contact_info'
    data: jsonb("data").notNull(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

// 2. Servicios
export const services = pgTable("services", {
    id: serial("id").primaryKey(),
    order: integer("order").default(0),
    label: text("label").notNull(),
    slug: text("slug").unique().notNull(),
    description: text("description").notNull(),
    image: text("image").notNull(),
    specs: jsonb("specs").notNull(), // { duration, recovery, frequency, result }
    benefits: jsonb("benefits").notNull(), // Array de strings
    faqs: jsonb("faqs").notNull(), // Array de { question, answer }
    updatedAt: timestamp("updated_at").defaultNow(),
});

// 3. Galería
export const galleryItems = pgTable("gallery_items", {
    id: serial("id").primaryKey(),
    order: integer("order").default(0),
    src: text("src").notNull(),
    category: text("category").notNull(),
    title: text("title").notNull(),
});

// 4. Resultados (Casos de éxito)
export const results = pgTable("results", {
    id: serial("id").primaryKey(),
    order: integer("order").default(0),
    title: text("title").notNull(),
    caseId: text("case_id").notNull(), // "01", "02", etc
    beforeImage: text("before_image").notNull(),
    afterImage: text("after_image").notNull(),
});

// 5. Testimonios
export const testimonials = pgTable("testimonials", {
    id: serial("id").primaryKey(),
    order: integer("order").default(0),
    name: text("name").notNull(),
    text: text("text").notNull(),
    treatment: text("treatment").notNull(),
});
