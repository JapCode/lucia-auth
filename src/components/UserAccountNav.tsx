"use client";

import signOut from "@/utils/signOut";
import { User } from "lucia";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const UserAccountNav = ({ user }: { user: User }) => {
  // const { signOut } = useAuth()

  const logout = () => {
    signOut();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="overflow-visible">
        <Button variant="secondary" size="sm" className="relative">
          My account
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-white w-40" align="end">
        {/* <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-0.5 leading-none">
            <p className="font-medium text-sm text-black">{user.id}</p>
          </div>
        </div>

        <DropdownMenuSeparator /> */}

        <DropdownMenuItem asChild>
          <Link href="/my-account">Settings</Link>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={logout} className="cursor-pointer">
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
