import Link from "next/link";
import { DarkModeToggle } from "./dark-mode-toggle";

export function PageHeader() {
  return (
    <div className="w-full flex justify-between items-center">
      <Link href="/dashboard">
        <h1 className="text-2xl">🏆 Wordscapes Weekly</h1>
      </Link>
      <DarkModeToggle />
    </div>
  );
}
