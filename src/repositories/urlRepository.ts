import { eq } from "drizzle-orm";
import { db } from "../db/connection";
import { urlTable } from "../db/schema";
import { redis } from "../db/redis";

export class UrlRepository {
    async create(url: string) {
        const newUrl: typeof urlTable.$inferInsert = {
            url
        }

        return await db.insert(urlTable).values(newUrl).returning();
    }

    async findAll() {
        return db.select().from(urlTable);
    }

    async findById(id: number) {
        const url = await db.select().from(urlTable).where(eq(urlTable.id, id))
        return url.at(0);
    }

    async findByUrl(url: string) {
        return await db.select().from(urlTable).where(eq(urlTable.url, url));
    }

    async incrementClick(code: string) {
        await redis.incr(`clicks:${code}`);
    }

}