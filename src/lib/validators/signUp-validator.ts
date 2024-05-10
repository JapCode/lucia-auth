import { z } from "zod";

export const SignUpValidator = z.object({
  firstName: z.string().min(2, {
    message: "first name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "last name must be at least 2 characters.",
  }),
  email: z.string().email(),
  password: z.string().min(8, {
    message: "the password must be at least 8 characters",
  }),
});

export type TSignUpValidator = z.infer<typeof SignUpValidator>;
