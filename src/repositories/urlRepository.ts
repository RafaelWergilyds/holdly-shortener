import { eq, and, gte } from 'drizzle-orm'
import { db } from '../db/connection'
import { urlTable } from '../db/schema'
import { redis } from '../db/redis'
import { newUrl } from '../model/url'

export class UrlRepository {
  async create(userId: string, url: string) {
    const newUrl: newUrl = {
      url,
      userId,
    }

    return await db.insert(urlTable).values(newUrl).returning()
  }

  async findAll() {
    return db.select().from(urlTable)
  }

  async findById(id: number) {
    const url = await db.select().from(urlTable).where(eq(urlTable.id, id))
    return url.at(0)
  }

  async findByUrl(url: string) {
    return await db.select().from(urlTable).where(eq(urlTable.url, url))
  }

  async findByUrlAndUserId(userId: string, url: string) {
    const urls = await db
      .select()
      .from(urlTable)
      .where(and(eq(urlTable.userId, userId), eq(urlTable.url, url)))

    return urls
  }

  async findByUserId(userId: string) {
    return await db.select().from(urlTable).where(eq(urlTable.userId, userId))
  }

  async incrementClick(code: string) {
    await redis.incr(`clicks:${code}`)
  }
}
