import { DarkModeToggle } from "@/components/shared/dark-mode-toggle";
import { ProfileCard } from "@/components/shared/profile-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-start p-12 gap-y-5">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-2xl">🏆 Wordscapes Weekly</h1>
        <DarkModeToggle />
      </div>

      <ProfileCard />
    </main>
  );
}
