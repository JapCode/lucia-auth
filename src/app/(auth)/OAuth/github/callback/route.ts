import { db } from "@/app/db/db";
import { userTable } from "@/app/db/schema";
import { lucia } from "@/lib/auth";
import { github } from "@/lib/OAuth";
import { OAuth2RequestError } from "arctic";
import { eq } from "drizzle-orm";
import { generateId } from "lucia";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies().get("github_oauth_state")?.value ?? null;
  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await github.validateAuthorizationCode(code);
    const githubUserResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
    const githubUser: GitHubUser = await githubUserResponse.json();
    // const existingUser = db
    //   .prepare("SELECT * FROM user WHERE github_id = ?")
    //   .get(githubUser.id) as IDatabaseUser | undefined;

    const result = await db
      .select()
      .from(userTable)
      .where(eq(userTable.github_id, githubUser.id));
    const existingUser = result[0];

    if (existingUser) {
      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/",
        },
      });
    }

    const userId = generateId(15);
    console.log(githubUser);

    // db.prepare(
    //   "INSERT INTO user (id, github_id, username) VALUES (?, ?, ?)"
    // ).run(userId, githubUser.id, githubUser.login);
    await db
      .insert(userTable)
      .values({
        id: userId,
        github_id: githubUser.id,
        username: githubUser.login,
      });
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  } catch (e) {
    if (
      e instanceof OAuth2RequestError &&
      e.message === "bad_verification_code"
    ) {
      // invalid code
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
}

interface GitHubUser {
  id: string;
  login: string;
}
