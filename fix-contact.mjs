import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './src/db/schema.js';
import { eq } from 'drizzle-orm';

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql, { schema });

const CONTACT_CONTENT = {
    editorial: {
        subtitle: "Ubicación & Contacto",
        titleLight: "Contacto",
        titleBold: "& Ubicación",
        description: "Estamos aquí para atenderle y responder todas sus dudas.",
        footerTag: "Atención Personalizada"
    },
    cards: {
        map: {
            category: "Ubicación",
            title: "Mapa Google",
            overlay: "Ver ubicación interactiva en Google Maps."
        },
        clinic: {
            category: "Sede Principal",
            title: "Calle 99 # 49-56, Bogotá CO",
            overlayTitle: "Dirección"
        },
        socials: {
            category: "Atención",
            title: "Canales Directos"
        }
    }
};

async function updateContactEditorial() {
    console.log("🔄 Actualizando contact_editorial...");

    try {
        // Verificar si existe
        const existing = await db.query.siteContent.findFirst({
            where: eq(schema.siteContent.section, 'contact_editorial')
        });

        if (existing) {
            console.log("📝 Registro existente encontrado, actualizando...");
            await db.update(schema.siteContent)
                .set({ data: CONTACT_CONTENT, updatedAt: new Date() })
                .where(eq(schema.siteContent.section, 'contact_editorial'));
        } else {
            console.log("➕ No existe, creando nuevo...");
            await db.insert(schema.siteContent).values({
                section: 'contact_editorial',
                data: CONTACT_CONTENT
            });
        }

        console.log("✅ contact_editorial actualizado correctamente!");
        console.log("\n📋 Datos insertados:");
        console.log(JSON.stringify(CONTACT_CONTENT, null, 2));

    } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
    }
}

updateContactEditorial();
