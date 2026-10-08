import { FastifyReply, FastifyRequest } from 'fastify'
import { UserService } from '../services/userService.ts'
import { UserRepository } from '../repositories/userRepository.ts'
import { ForbiddenError } from '../errors.ts'
import { CreateUserBody, UserIdParams } from '../validations/schemas.ts'

const repository = new UserRepository()
const service = new UserService(repository)

export class UserController {
  async createUser(request: FastifyRequest<{ Body: CreateUserBody }>, reply: FastifyReply) {
    const { email, password, name } = request.body

    const response = await service.createUser(name, email, password)
    return reply.status(201).send(response)
  }

  async findMe(request: FastifyRequest, reply: FastifyReply) {
    const response = await service.findUserById(request.user.id)
    return reply.status(200).send(response)
  }

  async findUserById(request: FastifyRequest<{ Params: UserIdParams }>, reply: FastifyReply) {
    const { id } = request.params

    if (id !== request.user.id) throw new ForbiddenError()

    const response = await service.findUserById(id)
    return reply.status(200).send(response)
  }
}
