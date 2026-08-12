import { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import { urlTable } from '../db/schema'

export type Url = InferSelectModel<typeof urlTable>
export type newUrl = InferInsertModel<typeof urlTable>
