import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { validateRequest } from "@/lib/auth";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/sign-in");
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-slate-950">
      <div className="flex h-60 w-full flex-col items-center justify-center  text-white">
        <Card className="mx-auto max-w-md">
          <CardHeader>
            <CardTitle>My account</CardTitle>
            <CardDescription>
              Here you can manage your account settings and update your profile
              (this information is provide by the cookie )
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-gray-600">
              <li>
                id:
                <span className="font-semibold text-gray-800 pl-2">
                  {user.id}
                </span>
              </li>
              <li>
                username:
                <span className="font-semibold text-gray-800 pl-2">
                  {user.username != null ? user.username : "Not set"}
                </span>
              </li>
              <li>
                githubId:
                <span className="font-semibold text-gray-800 pl-2">
                  {user.githubId != null ? user.githubId : "Not set"}
                </span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <div className=" w-full flex justify-center items-center">
              <Link
                href="/"
                className={cn(buttonVariants({ variant: "link" }))}
              >
                Back to home
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
