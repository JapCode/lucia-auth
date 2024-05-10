"use server";
import { db } from "@/app/db/db";
import { userTable } from "@/app/db/schema";
import { lucia } from "@/lib/auth";
import { TSignInValidator } from "@/lib/validators/signIn-validator";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function signIn(formData: TSignInValidator) {
  // search user in the data base
  const result = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, formData.email));
  const existingUser = result[0];
  console.log("existingUser:", existingUser);
  if (!existingUser) {
    // NOTE:
    // Returning immediately allows malicious actors to figure out valid usernames from response times,
    // allowing them to only focus on guessing passwords in brute-force attacks.
    // As a preventive measure, you may want to hash passwords even for invalid usernames.
    // However, valid usernames can be already be revealed with the signup page among other methods.
    // It will also be much more resource intensive.
    // Since protecting against this is non-trivial,
    // it is crucial your implementation is protected against brute-force attacks with login throttling etc.
    // If usernames are public, you may outright tell the user that the username is invalid.
    throw new Error("Incorrect username or password");
  }
  if (existingUser.password == null) {
    throw new Error("Incorrect username or password");
  }
  const validPassword = await bcrypt.compare(
    formData.password,
    existingUser.password
  );
  if (!validPassword) {
    throw new Error("Incorrect username or password");
  }

  // save session on cookie
  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/");
}

export default signIn;
