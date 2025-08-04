import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const post = pgTable("post", {
	id: uuid("id").primaryKey().defaultRandom(),
	content: text("content").notNull(),
	authorId: text("author_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	createdAt: timestamp("created_at").notNull().defaultNow(),
});
