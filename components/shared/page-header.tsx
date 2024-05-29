import Link from "next/link";
import { DarkModeToggle } from "./dark-mode-toggle";
import { Button } from "../ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { SearchIconButton } from "./search-icon-button";
import { cn } from "@/lib/utils";
import { UploadScoresButton } from "./buttons/upload-scores-button";

export function PageHeader() {
  return (
    <div className="w-full flex justify-between items-center pb-4 gap-x-4">
      <Link href="/">
        <h1 className="text-2xl flex gap-x-2">
          <p>🏆</p>
          <p className={cn("hidden", "phone:block")}>Wordscapes Weekly</p>
        </h1>
      </Link>
      <div className="flex items-center gap-x-4">
        <SignedOut>
          <Button asChild>
            <SignInButton>Create Account</SignInButton>
          </Button>
        </SignedOut>
        <SignedIn>
          <UploadScoresButton />
          <UserButton />
        </SignedIn>
        <SearchIconButton />
        <DarkModeToggle />
      </div>
    </div>
  );
}
