"use server";
import { db } from "@/app/db/db";
import { userTable } from "@/app/db/schema";
import { lucia } from "@/lib/auth";
import { TSignUpValidator } from "@/lib/validators/signUp-validator";
// import { hash } from "@node-rs/argon2";
import bcrypt from "bcrypt";
import { generateIdFromEntropySize } from "lucia";
import { cookies } from "next/headers";

async function signUp(formData: TSignUpValidator) {
  try {
    // hashed password and
    const hashedPassword = await bcrypt.hash(formData.password, 10);
    // generate the user id
    const userId = generateIdFromEntropySize(10); // 16 characters long

    // add to the data base using drizzle
    await db.insert(userTable).values({
      id: userId,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: hashedPassword,
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  } catch (error) {
    if (isCustomDatabaseDrizzleError(error)) {
      if (error.code === "23505" && error.constraint === "user_email_unique") {
        throw new Error("The email is already in use.");
      } else {
        //@ts-ignore
        throw new Error(`Error creating user: ${error.message}`);
      }
    } else {
      //@ts-ignore
      throw new Error(`Unexpected error: ${error.message}`);
    }
  }
}

// Función para verificar si el error es del tipo esperado
function isCustomDatabaseDrizzleError(
  error: any
): error is ICustomDatabaseDrizzleError {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    "constraint" in error
  );
}
export default signUp;
