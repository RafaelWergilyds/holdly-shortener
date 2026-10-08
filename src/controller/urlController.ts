import { FastifyReply, FastifyRequest } from 'fastify'
import { UrlRepository } from '../repositories/urlRepository.ts'
import { UrlService } from '../services/urlService.ts'
import { CodeParams, CreateUrlBody } from '../validations/schemas.ts'

const repository = new UrlRepository()
const service = new UrlService(repository)

export class UrlController {
  async createUrl(request: FastifyRequest<{ Body: CreateUrlBody }>, reply: FastifyReply) {
    const { url } = request.body
    const { id } = request.user

    const response = await service.createUrl(id, url)
    return reply.status(201).send(response)
  }

  async findAllUrlsByUserId(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.user

    const response = await service.findUrlsByUserId(id)
    return reply.status(200).send(response)
  }

  async redirectUrl(request: FastifyRequest<{ Params: CodeParams }>, reply: FastifyReply) {
    const { code } = request.params

    const response = await service.findUrlByCode(code)
    return reply.redirect(response.url, 302)
  }
}
