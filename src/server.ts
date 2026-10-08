import app from './app.ts'
import { env } from './env.ts'
import { syncClicks } from './jobs/syncClicks.ts'
import { db } from './db/connection.ts'
import { redis } from './db/redis.ts'

const syncInterval = setInterval(() => {
  syncClicks().catch((err: Error) => app.log.error(err, 'Error synchronizing clicks'))
}, 60_000)

async function shutdown(signal: string) {
  app.log.info(`${signal} received, shutting down`)
  clearInterval(syncInterval)

  try {
    await app.close()
    await syncClicks()
    await redis.quit()
    await db.$client.end()
    process.exit(0)
  } catch (err) {
    app.log.error(err, 'Error during shutdown')
    process.exit(1)
  }
}

process.once('SIGINT', shutdown)
process.once('SIGTERM', shutdown)

app
  .listen({
    port: env.PORT,
    host: '0.0.0.0',
  })
  .catch((err) => {
    app.log.error(err, 'Failed to start server')
    process.exit(1)
  })
