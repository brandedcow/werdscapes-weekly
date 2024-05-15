"use client"; // Error components must be Client Components

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Cat, Dog, Rabbit, Snail, Squirrel, Turtle } from "lucide-react";
import React, { useEffect } from "react";
import { v4 } from "uuid";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  const animals = [
    <Snail />,
    <Cat />,
    <Dog />,
    <Rabbit />,
    <Squirrel />,
    <Turtle />,
  ];

  const randomAnimal = animals[parseInt(v4()) % animals.length];

  return (
    <Card>
      <CardHeader className="flex-row justify-between">
        <div className="flex flex-col gap-y-1.5">
          <div className="flex flex-row gap-x-1">
            <CardTitle>Somethign went wrong.. </CardTitle>
            {randomAnimal}
          </div>
          <CardDescription>
            It's probably us not you, please try and reload
          </CardDescription>
        </div>

        <Button onClick={() => reset()}>Reload</Button>
      </CardHeader>
    </Card>
  );
}
