import { eq, and, gte } from 'drizzle-orm'
import { db } from '../db/connection.ts'
import { urlTable } from '../db/schema.ts'
import { redis } from '../db/redis.ts'
import { newUrl, Url } from '../model/url.ts'

export class UrlRepository {
  async create(userId: string, url: string): Promise<Url> {
    const newUrl: newUrl = {
      url,
      userId,
    }

    const createdUrl = await db.insert(urlTable).values(newUrl).returning()

    return createdUrl[0]
  }

  async findAll(): Promise<Url[]> {
    return db.select().from(urlTable)
  }

  async findById(id: number): Promise<Url> {
    const url = await db.select().from(urlTable).where(eq(urlTable.id, id))
    return url[0]
  }

  async findByUrl(url: string): Promise<Url> {
    const findedUrl = await db.select().from(urlTable).where(eq(urlTable.url, url))
    return findedUrl[0]
  }

  async findByUrlAndUserId(userId: string, url: string): Promise<Url[]> {
    const urls = await db
      .select()
      .from(urlTable)
      .where(and(eq(urlTable.userId, userId), eq(urlTable.url, url)))

    return urls
  }

  async findByUserId(userId: string): Promise<Url[]> {
    return await db.select().from(urlTable).where(eq(urlTable.userId, userId))
  }

  async incrementClick(code: string) {
    await redis.incr(`clicks:${code}`)
  }
}
