// Script para verificar los datos de contact_editorial
import { db } from "./src/db/index.js";
import pkg from 'drizzle-orm';
const { eq } = pkg;

const contactData = await db.query.siteContent.findFirst({
    where: (siteContent, { eq }) => eq(siteContent.section, 'contact_editorial')
});

console.log('\n📋 === CONTACT_EDITORIAL DATA ===\n');
console.log(JSON.stringify(contactData?.data, null, 2));
console.log('\n=== END ===\n');
