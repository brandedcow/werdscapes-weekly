import Link from "next/link";
import { DarkModeToggle } from "./dark-mode-toggle";
import { Button } from "../ui/button";

export function PageHeader() {
  return (
    <div className="w-full flex justify-between items-center">
      <Link href="/dashboard">
        <h1 className="text-2xl">🏆 Wordscapes Weekly</h1>
      </Link>
      <div className="flex items-center gap-x-4">
        <Link href="/register">
          <Button>Create Account</Button>
        </Link>
        <DarkModeToggle />
      </div>
    </div>
  );
}
