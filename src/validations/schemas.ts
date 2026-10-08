import { z } from 'zod'

export const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3000),
  DATABASE_URL: z.url(),
  REDIS_HOST: z.string().min(1).default('localhost'),
  REDIS_PORT: z.coerce.number().int().positive().default(6379),
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRATION: z.string().min(1).default('1d'),
  HASHIDS_SALT: z.string().min(1),
})

export const createUrlBody = z
  .object({
    url: z.url({ protocol: /^https?$/ }).max(2048),
  })
  .strict()

export const codeParams = z.object({
  code: z.string().min(1).max(64),
})

export const loginBody = z
  .object({
    email: z.string().max(255),
    password: z.string().max(128),
  })
  .strict()

export const createUserBody = z
  .object({
    name: z.string().trim().min(1).max(255),
    email: z.email().max(255),
    password: z.string().min(8).max(128),
  })
  .strict()

export const userIdParams = z.object({
  id: z.uuid(),
})

export type Env = z.infer<typeof envSchema>
export type CreateUrlBody = z.infer<typeof createUrlBody>
export type CodeParams = z.infer<typeof codeParams>
export type LoginBody = z.infer<typeof loginBody>
export type CreateUserBody = z.infer<typeof createUserBody>
export type UserIdParams = z.infer<typeof userIdParams>
