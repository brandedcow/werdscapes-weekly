import { DarkModeToggle } from "@/components/shared/dark-mode-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-2xl">🏆 Wordscapes Weekly</h1>
        <DarkModeToggle />
      </div>
      <div>
        <h2>Enter player name to track tags</h2>
        <Input />
        <Button>Submit</Button>
      </div>
    </main>
  );
}
