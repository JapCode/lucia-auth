"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  SignUpValidator,
  TSignUpValidator,
} from "@/lib/validators/signUp-validator";

import signUp from "@/utils/signUp";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const SignUpForm = () => {
  // 1. Define your form.
  const form = useForm<TSignUpValidator>({
    resolver: zodResolver(SignUpValidator),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });
  // 2. Define a submit handler.
  function onSubmit(values: TSignUpValidator) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    toast.promise(signUp(values), {
      loading: "loading...",
      success: "the user has be create successfully",
      error: (value) => `${value.message}`,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="grid gap-2 space-y-0">
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input placeholder="Max" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="grid gap-2 space-y-0">
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input placeholder="Robinson" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Create an account
        </Button>
        <Button variant="outline" className="w-full">
          Sign up with GitHub
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
