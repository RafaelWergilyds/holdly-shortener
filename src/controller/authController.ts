import { FastifyRequest, FastifyReply } from 'fastify'
import { UserRepository } from '../repositories/userRepository.ts'
import { AuthService } from '../services/authService.ts'

const repository = new UserRepository()
const service = new AuthService(repository)

export class AuthController {
  async login(
    request: FastifyRequest<{ Body: { email: string; password: string } }>,
    reply: FastifyReply,
  ) {
    const { email, password } = request.body

    try {
      const response = await service.login(request.server, email, password)

      reply.status(201).send({ accessToken: response })
    } catch (error) {
      reply.status(401).send({ error: 'Invalid credentials' })
    }
  }
}
