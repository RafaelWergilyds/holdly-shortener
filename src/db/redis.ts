import { Redis } from 'ioredis'
import { env } from '../env.ts'

export const redis = new Redis({
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
})

redis.on('error', (err: Error) => console.error('Error Redis:', err))
