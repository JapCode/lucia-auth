import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
  id: text("id").primaryKey(),
  username: text("username"),
  firstName: text("first-name"),
  lastName: text("last-name"),
  github_id: text("github_id").unique(),
  avatar: text("avatar"),
  email: text("email").unique(),
  password: text("password"),
});

export const sessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export interface IDatabaseUser {
  id: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  github_id?: string;
  avatar?: string;
  email?: string;
  password?: string;
}

export interface IDatabaseSession {
  id: string;
  userId: string;
  expiresAt: Date;
}
