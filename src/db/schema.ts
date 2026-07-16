
import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const urlTable = pgTable("shorten_url", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    url: varchar({ length: 2048 }).notNull().unique(),
    clicks: integer('clicks').default(0).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('update_at', { mode: 'date' })
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull()
})