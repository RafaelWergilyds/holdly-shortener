import { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import { userTable } from '../db/schema'

export type User = InferSelectModel<typeof userTable>
export type newUser = InferInsertModel<typeof userTable>
