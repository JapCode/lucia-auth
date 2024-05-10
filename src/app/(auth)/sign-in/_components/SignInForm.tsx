"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  SignInValidator,
  TSignInValidator,
} from "@/lib/validators/signIn-validator";

import signIn from "@/utils/signIn";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const SignInForm = () => {
  // 1. Define your form.
  const form = useForm<TSignInValidator>({
    resolver: zodResolver(SignInValidator),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  // 2. Define a submit handler.
  function onSubmit(values: TSignInValidator) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    toast.promise(signIn(values), {
      loading: "loading...",
      success: "Login successfully",
      error: (value) => `${value.message}`,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="m@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="superSecretPassword"
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <div className="w-full flex justify-end pt-2">
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Login
        </Button>
        <Link
          href="/OAuth/github"
          className={cn(
            buttonVariants({
              variant: "outline",
              className: "w-full",
            })
          )}
        >
          Login with Github
        </Link>
      </form>
    </Form>
  );
};

export default SignInForm;
