import { FastifyReply, FastifyRequest } from 'fastify'
import { UserService } from '../services/userService.ts'
import { UserRepository } from '../repositories/userRepository.ts'

const repository = new UserRepository()
const service = new UserService(repository)

export class UserController {
  async createUser(
    request: FastifyRequest<{ Body: { email: string; password: string; name: string } }>,
    reply: FastifyReply,
  ) {
    const { email, password, name } = request.body

    try {
      const response = await service.createUser(name, email, password)
      return reply.status(201).send(response)
    } catch (error) {
      return reply.status(500).send(error)
    }
  }

  async findAllUsers(_: FastifyRequest, reply: FastifyReply) {
    try {
      const response = await service.findAllUsers()
      return reply.status(200).send(response)
    } catch (error) {
      return reply.status(500).send(error)
    }
  }

  async findUserById(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string }

    try {
      const response = await service.findUserById(id)
      return reply.status(200).send(response)
    } catch (error) {
      return reply.status(500).send(error)
    }
  }
}
