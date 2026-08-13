import { FastifyInstance } from 'fastify'
import { urlRoutes } from './urlRoutes.ts'
import { useRoutes } from './userRoutes.ts'

export async function routes(app: FastifyInstance) {
 app.register(urlRoutes, useRoutes)
}
