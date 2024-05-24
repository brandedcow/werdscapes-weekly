import Link from "next/link";
import { DarkModeToggle } from "./dark-mode-toggle";
import { Button } from "../ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
} from "@clerk/nextjs";

export function PageHeader() {
  return (
    <div className="w-full flex justify-between items-center">
      <Link href="/dashboard">
        <h1 className="text-2xl">🏆 Wordscapes Weekly</h1>
      </Link>
      <div className="flex items-center gap-x-4">
        <SignedOut>
          <Button asChild>
            <SignInButton>Create Account</SignInButton>
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <DarkModeToggle />
      </div>
    </div>
  );
}
