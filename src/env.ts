import 'dotenv/config'
import { z } from 'zod'
import { envSchema } from './validations/schemas.ts'

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  console.error('Invalid environment variables:\n' + z.prettifyError(parsed.error))
  process.exit(1)
}

export const env = parsed.data
