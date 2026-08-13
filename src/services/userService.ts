import argon2 from 'argon2'
import { UserRepository } from '../repositories/userRepository.ts'
import { User } from '../model/user.ts'

type UserResponse = Omit<User, 'password' | 'updatedAt'>

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(name: string, email: string, password: string): Promise<UserResponse> {
    const findUser = await this.userRepository.findByEmail(email)

    if (findUser) throw new Error('User already exists')

    const passwordHash = await argon2.hash(password)

    const newUser = await this.userRepository.create(name, email, passwordHash)

    const userResponse: UserResponse = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      createdAt: newUser.createdAt,
    }

    return userResponse
  }

  async findAllUsers(): Promise<UserResponse[]> {
    const users = await this.userRepository.findAll()
    const usersResponse: UserResponse[] = []

    users.forEach((user) => {
      const userResponse: UserResponse = {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      }
      usersResponse.push(userResponse)
    })

    return usersResponse
  }

  async findUserById(id: string): Promise<UserResponse> {
    const findUser = await this.userRepository.findById(id)

    if (!findUser) throw new Error('User not found')

    const userResponse: UserResponse = {
      id: findUser.id,
      name: findUser.name,
      email: findUser.email,
      createdAt: findUser.createdAt,
    }

    return userResponse
  }
}
