import { FastifyReply, FastifyRequest } from 'fastify'
import { UrlRepository } from '../repositories/urlRepository.ts'
import { UrlService } from '../services/urlService.ts'

const repository = new UrlRepository()
const service = new UrlService(repository)

export class UrlController {
  async createUrl(request: FastifyRequest, reply: FastifyReply) {
    const { url } = request.body as { url: string }
    const { id } = request.user

    try {
      const response = await service.createUrl(id, url)
      return reply.status(201).send(response)
    } catch (error) {
      return reply.status(500).send(error)
    }
  }

  async findAllUrls(_: FastifyRequest, reply: FastifyReply) {
    const response = await service.getAllUrls()

    reply.status(200).send(response)
  }

  async findAllUrlsByUserId(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.user

    try {
      const response = await service.findUrlsByUserId(id)
      return reply.status(200).send(response)
    } catch (error) {
      return reply.status(500).send(error)
    }
  }

  async redirectUrl(request: FastifyRequest<{ Params: { code: string } }>, reply: FastifyReply) {
    const { code } = request.params

    try {
      const url = await service.findUrlByCode(code)

      return reply.status(301).redirect(url.url)
    } catch (error) {
      return reply.status(500).send(error)
    }
  }
}
