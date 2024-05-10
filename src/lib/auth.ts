import { db } from "@/app/db/db";
import { IDatabaseUser, sessionTable, userTable } from "@/app/db/schema";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { Lucia, Session, TimeSpan, User } from "lucia";
import { cookies } from "next/headers";
import { cache } from "react";

// your adapter
export const adapter = new DrizzlePostgreSQLAdapter(
  db,
  sessionTable,
  userTable
);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.NODE_ENV === "production",
    },
  },
  sessionExpiresIn: new TimeSpan(5, "m"), // 5 minutes
  getUserAttributes: (attributes) => {
    return {
      githubId: attributes.github_id,
      username: attributes.username,
    };
  },
});

// validate the user session, this can be use on a server component
export const validateRequest = cache(
  async (): Promise<
    { user: User; session: Session } | { user: null; session: null }
  > => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    const result = await lucia.validateSession(sessionId);
    // next.js throws when you attempt to set cookie when rendering page
    try {
      if (result.session && result.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }
    } catch (error) {
      console.error(error);
    }
    console.log("result:", result);
    return result;
  }
);

// ** IMPORTANT!
// Make sure you've registered your types. Check that the typeof
// lucia is indeed an instance of Lucia (not a function that returns Lucia)
// and that there are no TS errors (including @ts-ignore) when declaring Lucia.
// Register must be an interface, not a type.
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: Omit<IDatabaseUser, "id">;
  }
}
