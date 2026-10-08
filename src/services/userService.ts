import argon2 from 'argon2'
import { UserRepository } from '../repositories/userRepository.ts'
import { User } from '../model/user.ts'
import { ConflictError, NotFoundError } from '../errors.ts'

type UserResponse = Omit<User, 'password' | 'updatedAt'>

function toUserResponse(user: User): UserResponse {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  }
}

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(name: string, email: string, password: string): Promise<UserResponse> {
    const findUser = await this.userRepository.findByEmail(email)

    if (findUser) throw new ConflictError('User already exists')

    const passwordHash = await argon2.hash(password)

    const newUser = await this.userRepository.create(name, email, passwordHash)

    return toUserResponse(newUser)
  }

  async findUserById(id: string): Promise<UserResponse> {
    const findUser = await this.userRepository.findById(id)

    if (!findUser) throw new NotFoundError('User not found')

    return toUserResponse(findUser)
  }
}
