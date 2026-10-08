import { FastifyRequest, FastifyReply } from 'fastify'
import { UserRepository } from '../repositories/userRepository.ts'
import { AuthService } from '../services/authService.ts'
import { LoginBody } from '../validations/schemas.ts'

const repository = new UserRepository()
const service = new AuthService(repository)

export class AuthController {
  async login(request: FastifyRequest<{ Body: LoginBody }>, reply: FastifyReply) {
    const { email, password } = request.body

    const response = await service.login(request.server, email, password)
    return reply.status(200).send({ accessToken: response })
  }
}
