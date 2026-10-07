import { eq, sql } from 'drizzle-orm'
import { db } from '../db/connection.ts'
import { redis } from '../db/redis.ts'
import { urlTable } from '../db/schema.ts'
import { decode } from '../utils/generateCode.ts'

let isRunning = false

export async function syncClicks() {
  if (isRunning) return
  isRunning = true

  try {
    const stream = redis.scanStream({ match: 'clicks:*', count: 100 })

    for await (const keys of stream as AsyncIterable<string[]>) {
      for (const key of keys) {
        const quantity = await redis.getdel(key)

        if (!quantity) continue

        const id = decode(key.replace('clicks:', ''))

        if (!id) continue

        await db
          .update(urlTable)
          .set({ clicks: sql`${urlTable.clicks} + ${Number(quantity)}` })
          .where(eq(urlTable.id, id))
      }
    }
  } finally {
    isRunning = false
  }
}
