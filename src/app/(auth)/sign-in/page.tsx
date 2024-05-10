import Image from "next/image";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { imagePaths } from "@/lib/const";
import { getRandomNumber } from "@/lib/utils";
import SignInForm from "./_components/SignInForm";

export default function Page() {
  const imagePath = imagePaths[getRandomNumber(0, imagePaths.length - 1)];

  return (
    <div className="w-full lg:grid lg:min-h-[600px] h-screen lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignInForm />
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="hidden bg-muted lg:block relative">
        <Image
          src={imagePath.url}
          alt="Image"
          fill
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          style={{
            objectPosition: imagePath.position,
          }}
        />
        <div className="w-full h-full bg-black/50 absolute"></div>
      </div>
    </div>
  );
}
