import { eq } from "drizzle-orm";
import { db } from "../db/connection";
import { userTable } from "../db/schema";

export class UserRepository {
    async create(name: string, email: string, password: string) {
        const newUser: typeof userTable.$inferInsert = {
            name,
            email,
            password
        }
        return await db.insert(userTable).values(newUser).returning();
    }

    async findAll() {
        return db.select().from(userTable);
    }

    async findByEmail(email: string) {
        const user = await db.select().from(userTable).where(eq(userTable.email, email));
        return user.at(0);
    }

    async findById(id: string) {
        const user = await db.select().from(userTable).where(eq(userTable.id, id));
        return user.at(0);
    }

}