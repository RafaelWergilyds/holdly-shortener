import { FastifyRequest } from 'fastify'
import { UnauthorizedError } from '../errors.ts'

export async function authMiddleware(request: FastifyRequest) {
  try {
    await request.jwtVerify()
  } catch {
    throw new UnauthorizedError('Invalid token')
  }
}
