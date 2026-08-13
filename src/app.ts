import fastify from 'fastify'
import fjwt from '@fastify/jwt'
import { routes } from './routes/routes.ts'
import 'dotenv/config'

const EXP = process.env.JWT_EXPIRATION
const SECRET = process.env.JWT_SECRET

const app = fastify()

app.register(fjwt, {
  secret: SECRET as string,
  sign: {
    expiresIn: EXP || '1d',
  },
})

app.register(routes, { prefix: '/api' })

export default app
