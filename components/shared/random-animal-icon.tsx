import { icons } from "lucide-react";

interface RandomAnimalIconProps {
  height?: number;
  width?: number;
}

export function RandomAnimalIcon({ height, width }: RandomAnimalIconProps) {
  const names = [
    "Cat",
    "Dog",
    "Rabbit",
    "Snail",
    "Squirrel",
    "Turtle",
    "Bird",
    "Bug",
    "Fish",
    "Rat",
    "Worm",
  ];

  const randomName = names[Math.floor(Math.random() * names.length)];

  //@ts-ignore
  const LucideIcon = icons[randomName];

  return <LucideIcon height={height ?? 200} width={width ?? 200} />;
}
