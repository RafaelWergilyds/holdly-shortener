import { FastifyReply, FastifyRequest } from "fastify";
import { UrlRepository } from "../repositories/urlRepository";
import { UrlService } from "../service/urlService";

const repository = new UrlRepository();
const service = new UrlService(repository);

export class UrlController {
    async createUrl(request: FastifyRequest<{ Body: { url: string } }>, reply: FastifyReply) {
        const { url } = request.body

        try {
            const response = await service.createUrl(url);
            return reply.status(201).send(response)

        } catch (error) {
            return reply.status(500).send(error)
        }
    }

    async findAllUrls(_: FastifyRequest, reply: FastifyReply) {
        const response = await service.getAllUrls();

        reply.status(200).send(response)
    }

    async redirectUrl(request: FastifyRequest<{ Params: { code: string } }>, reply: FastifyReply) {
        const { code } = request.params;

        try {
            const url = await service.findUrlByCode(code);
            
            return reply.status(301).redirect(url.url)
        } catch (error) {
            return reply.status(500).send(error)
        }
    }
}