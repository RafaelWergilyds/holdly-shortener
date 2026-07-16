import { eq, sql } from "drizzle-orm";
import { db } from "../db/connection";
import { redis } from "../db/redis";
import { urlTable } from "../db/schema";
import { decode } from "../utils/generateCode";

export async function syncClicks() {
    const keys = await redis.keys('clicks:*');
    
    for(const key of keys){
        const code = key.replace('clicks:', '');
        const quantity = await redis.get(key);

        if(!quantity) continue;
        
        const id = decode(code);

        if(!id) continue;

        await db.update(urlTable)
            .set({ clicks: sql`${urlTable.clicks} + ${Number(quantity)}`})
            .where(eq(urlTable.id, id));

        await redis.del(key);
    }

}