import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { neon } from '@neondatabase/serverless';
import * as fs from 'fs';
import * as path from 'path';

const databaseUrl = process.env.DATABASE_URL;

async function main() {
    console.log("🚀 Iniciando migración manual...");
    if (!databaseUrl) {
        throw new Error("DATABASE_URL no está definida en .env.local");
    }

    const sql = neon(databaseUrl);

    const migrationFile = path.join(process.cwd(), 'drizzle', '0000_dear_dreadnoughts.sql');
    console.log("📂 Buscando archivo en:", migrationFile);

    if (!fs.existsSync(migrationFile)) {
        throw new Error(`No se encontró el archivo de migración en ${migrationFile}`);
    }

    const sqlContent = fs.readFileSync(migrationFile, 'utf8');

    const statements = sqlContent.split('--> statement-breakpoint');

    for (let statement of statements) {
        statement = statement.trim();
        if (statement) {
            console.log("⏳ Ejecutando sentencia...");
            try {
                await sql(statement);
            } catch (e: any) {
                console.error("❌ Error ejecutando sentencia:", statement);
                console.error(e.message);
                throw e;
            }
        }
    }

    console.log("✅ Migración completada!");
}

main().catch(err => {
    console.error("❌ Fallo crítico:", err);
    process.exit(1);
});
