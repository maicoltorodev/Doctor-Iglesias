import { db } from "./src/db";
import { siteContent } from "./src/db/schema";

async function dump() {
    try {
        const content = await db.select().from(siteContent);
        console.log(JSON.stringify(content, null, 2));
    } catch (e) {
        console.error(e);
    }
    process.exit(0);
}

dump();
