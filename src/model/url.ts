import { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import { urlTable } from '../db/schema.ts'

export type Url = InferSelectModel<typeof urlTable>
export type newUrl = InferInsertModel<typeof urlTable>
