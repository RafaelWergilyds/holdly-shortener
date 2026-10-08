import { FastifyInstance } from 'fastify'
import { UserRepository } from '../repositories/userRepository.ts'
import { UnauthorizedError } from '../errors.ts'
import argon2 from 'argon2'

let dummyHash: Promise<string> | undefined

export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async login(app: FastifyInstance, email: string, password: string) {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      dummyHash ??= argon2.hash('dummy-password')
      await argon2.verify(await dummyHash, password)
      throw new UnauthorizedError('Invalid credentials')
    }

    const isPasswordMatches = await argon2.verify(user.password, password)
    if (!isPasswordMatches) throw new UnauthorizedError('Invalid credentials')

    return this.generateToken(app, {
      id: user.id,
      name: user.name,
      email: user.email,
    })
  }

  private generateToken(app: FastifyInstance, user: { id: string; name: string; email: string }) {
    return app.jwt.sign({ id: user.id, name: user.name, email: user.email })
  }
}
