import { FastifyInstance } from 'fastify'
import { UrlController } from '../controller/urlController.ts'
import { authMiddleware } from '../middleware/authMiddleware.ts'

const urlController = new UrlController()

export async function urlRoutes(app: FastifyInstance) {
  app.post('/shorten', { preHandler: [authMiddleware] }, urlController.createUrl)
  app.get('/', urlController.findAllUrls)
  app.get('/users/urls', { preHandler: [authMiddleware] }, urlController.findAllUrlsByUserId)
  app.get('/:code', urlController.redirectUrl)
}
