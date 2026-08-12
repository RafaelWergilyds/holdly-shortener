import { FastifyInstance } from 'fastify'
import { UserRepository } from '../repositories/userRepository'
import argon2 from 'argon2'

export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async login(app: FastifyInstance, email: string, password: string) {
    const user = await this.userRepository.findByEmail(email)
    if (!user) throw new Error('User not found')

    const isPasswordMatches = await argon2.verify(user.password, password)
    if (!isPasswordMatches) throw new Error('Invalid password')

    const token = this.generateToken(app, {
      id: user.id,
      name: user.name,
      email: user.email,
    })

    return token
  }

  private generateToken(app: FastifyInstance, user: { id: string; name: string; email: string }) {
    return app.jwt.sign({ id: user.id, name: user.name, email: user.email })
  }
}
