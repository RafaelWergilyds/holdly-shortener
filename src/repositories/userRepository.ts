import { eq } from 'drizzle-orm'
import { db } from '../db/connection.ts'
import { userTable } from '../db/schema.ts'
import { newUser, User } from '../model/user.ts'

export class UserRepository {
  async create(name: string, email: string, password: string): Promise<User> {
    const newUser = {
      name,
      email,
      password,
    }

    const createdUser = await db.insert(userTable).values(newUser).returning()

    return createdUser[0]
  }

  async findAll(): Promise<User[]> {
    return db.select().from(userTable)
  }

  async findByEmail(email: string): Promise<User> {
    const user = await db.select().from(userTable).where(eq(userTable.email, email))
    return user[0]
  }

  async findById(id: string): Promise<User> {
    const user = await db.select().from(userTable).where(eq(userTable.id, id))
    return user[0]
  }
}
