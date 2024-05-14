import { DarkModeToggle } from "./dark-mode-toggle";

export function PageHeader() {
  return (
    <div className="w-full flex justify-between items-center">
      <h1 className="text-2xl">🏆 Wordscapes Weekly</h1>
      <DarkModeToggle />
    </div>
  );
}
