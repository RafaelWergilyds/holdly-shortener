import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { UserController } from '../controller/userController.ts'
import { AuthController } from '../controller/authController.ts'
import { authMiddleware } from '../middleware/authMiddleware.ts'
import { createUserBody, loginBody, userIdParams } from '../validations/schemas.ts'

const userController = new UserController()
const authController = new AuthController()

const loginRateLimit = { max: 5, timeWindow: '1 minute' }

export async function useRoutes(fastify: FastifyInstance) {
  const app = fastify.withTypeProvider<ZodTypeProvider>()

  app.post(
    '/auth',
    { schema: { body: loginBody }, config: { rateLimit: loginRateLimit } },
    authController.login,
  )
  app.post('/users', { schema: { body: createUserBody } }, userController.createUser)
  app.get('/users/me', { preHandler: [authMiddleware] }, userController.findMe)
  app.get(
    '/users/:id',
    { preHandler: [authMiddleware], schema: { params: userIdParams } },
    userController.findUserById,
  )
}
