import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { UrlController } from '../controller/urlController.ts'
import { authMiddleware } from '../middleware/authMiddleware.ts'
import { codeParams, createUrlBody } from '../validations/schemas.ts'

const urlController = new UrlController()

export async function urlRoutes(fastify: FastifyInstance) {
  const app = fastify.withTypeProvider<ZodTypeProvider>()

  app.post(
    '/shorten',
    { preHandler: [authMiddleware], schema: { body: createUrlBody } },
    urlController.createUrl,
  )
  app.get('/users/urls', { preHandler: [authMiddleware] }, urlController.findAllUrlsByUserId)
  app.get('/:code', { schema: { params: codeParams } }, urlController.redirectUrl)
}
