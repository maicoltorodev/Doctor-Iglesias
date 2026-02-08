import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';
import * as content from '../constants/content';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

async function main() {
    console.log("🌱 Empezando el seed...");

    try {
        // 1. Limpiar tablas existentes (opcional, pero útil para resetear)
        console.log("🧹 Limpiando base de datos...");
        await db.delete(schema.siteContent);
        await db.delete(schema.services);
        await db.delete(schema.galleryItems);
        await db.delete(schema.results);
        await db.delete(schema.testimonials);

        // 2. Contenido Editorial
        console.log("📝 Insertando contenido editorial...");
        const editorialSections = [
            { section: "nav_links", data: content.NAV_LINKS },
            { section: "contact_info", data: content.CONTACT_INFO },
            { section: "contact_editorial", data: content.CONTACT_CONTENT },
            { section: "common_content", data: content.COMMON_CONTENT },
            { section: "hero", data: content.HERO_CONTENT },
            { section: "about", data: content.ABOUT_CONTENT },
            { section: "gallery_editorial", data: content.GALLERY_CONTENT },
            { section: "services_editorial", data: content.SERVICES_CONTENT },
            { section: "service_detail", data: content.SERVICE_DETAIL_CONTENT },
            { section: "results_editorial", data: content.RESULTS_CONTENT },
            { section: "testimonials_editorial", data: content.TESTIMONIALS_CONTENT },
            { section: "fab", data: content.FAB_CONTENT },
            { section: "error_pages", data: content.ERROR_PAGES_CONTENT },
        ];

        for (const item of editorialSections) {
            await db.insert(schema.siteContent).values(item);
        }

        // 3. Servicios
        console.log("🏥 Insertando servicios...");
        for (let i = 0; i < content.SERVICES_LIST.length; i++) {
            const s = content.SERVICES_LIST[i];
            await db.insert(schema.services).values({
                order: i,
                label: s.label,
                slug: s.slug,
                description: s.description,
                image: s.image,
                specs: s.specs,
                benefits: s.benefits,
                faqs: s.faqs,
            });
        }

        // 4. Galería
        console.log("🖼️ Insertando galería...");
        for (let i = 0; i < content.GALLERY_LIST.length; i++) {
            const g = content.GALLERY_LIST[i];
            await db.insert(schema.galleryItems).values({
                order: i,
                src: g.src,
                category: g.category,
                title: g.title,
            });
        }

        // 5. Resultados
        console.log("✨ Insertando resultados...");
        for (let i = 0; i < content.RESULTS_LIST.length; i++) {
            const r = content.RESULTS_LIST[i];
            await db.insert(schema.results).values({
                order: i,
                title: r.title,
                caseId: r.id,
                beforeImage: r.before,
                afterImage: r.after,
            });
        }

        // 6. Testimonios
        console.log("💬 Insertando testimonios...");
        for (let i = 0; i < content.TESTIMONIALS_LIST.length; i++) {
            const t = content.TESTIMONIALS_LIST[i];
            await db.insert(schema.testimonials).values({
                order: i,
                name: t.name,
                text: t.text,
                treatment: t.treatment,
            });
        }

        console.log("✅ Seed completado con éxito!");
    } catch (error) {
        console.error("❌ Error durante el seed:", error);
        process.exit(1);
    }
}

main();
