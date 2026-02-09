import { db } from "./src/db/index.js";
import { siteContent } from "./src/db/schema.js";
import { eq } from "drizzle-orm";

async function checkContactData() {
    try {
        const contactData = await db.query.siteContent.findFirst({
            where: eq(siteContent.section, 'contact_editorial')
        });

        console.log('\n=== CONTACT_EDITORIAL DATA ===');
        console.log(JSON.stringify(contactData, null, 2));
        console.log('\n=== END ===\n');

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

checkContactData();
