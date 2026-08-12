import { FastifyInstance } from 'fastify'
import { UrlController } from '../controller/urlController'
import { UserController } from '../controller/userController'
import { AuthController } from '../controller/authController'
import { authMiddleware } from '../middleware/authMiddleware'

const urlController = new UrlController()
const userController = new UserController()
const authController = new AuthController()

export async function routes(app: FastifyInstance) {
  app.post('/auth', authController.login)
  app.post('/shorten', { preHandler: [authMiddleware] }, urlController.createUrl)
  app.get('/', urlController.findAllUrls)
  app.get('/users/urls', { preHandler: [authMiddleware] }, urlController.findAllUrlsByUserId)
  app.get('/:code', urlController.redirectUrl)
  app.get('/users', { preHandler: [authMiddleware] }, userController.findAllUsers)
  app.post('/users', userController.createUser)
  app.get('/users/:id', userController.findUserById)
}
