import { index, integer, pgTable, timestamp, unique, uuid, varchar } from 'drizzle-orm/pg-core'
import { uuidv7 } from 'uuidv7'

export const userTable = pgTable('users', {
  id: uuid('id')
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
})

export const urlTable = pgTable(
  'shorten_url',
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    url: varchar({ length: 2048 }).notNull(),
    clicks: integer('clicks').default(0).notNull(),
    userId: uuid('user_id')
      .references(() => userTable.id)
      .notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => ({
    urlUserUnique: unique('url_user_unique').on(table.url, table.userId),
    userIdIdx: index('user_id_idx').on(table.userId),
  }),
)
