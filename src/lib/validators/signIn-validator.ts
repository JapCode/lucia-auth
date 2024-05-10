import { z } from "zod";

export const SignInValidator = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "the password must be at least 8 characters",
  }),
});

export type TSignInValidator = z.infer<typeof SignInValidator>;
