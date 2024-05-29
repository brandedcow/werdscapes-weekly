"use client";

import { Label } from "@/components/ui/label";
import { Player } from "@prisma/client";
import { useState } from "react";
import { z } from "zod";
import { useDebouncedCallback } from "use-debounce";
import { v4 } from "uuid";
import { SelectedInfo } from "../selected-info";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useUploadFormStore } from "@/data/useUploadFormStore";
import getPlayers from "@/data/getPlayers";

const findPlayerFormSchema = z.object({
  name: z.string().min(1),
});

export type findPlayerFormValues = z.infer<typeof findPlayerFormSchema>;

export function FindPlayerForm() {
  const [searchResults, setSearchResults] = useState<Player[]>([]);
  const { setPlayer } = useUploadFormStore();

  const debouncedSearch = useDebouncedCallback(
    async (value: string) => {
      const { success, data } = await getPlayers(value, 5);

      if (!success || data === undefined) return;

      setSearchResults(() => data);
    },
    300,
    { maxWait: 2000 }
  );

  return (
    <div className="space-y-2">
      <Label>Find Player</Label>
      <Input
        placeholder="Search by Player Name"
        onChange={(event) => debouncedSearch(event.target.value)}
      />
      {searchResults.map((player) => (
        <Card
          key={v4()}
          className="p-2 hover:bg-secondary transition-colors"
          onClick={() => setPlayer(player)}
        >
          <SelectedInfo item={player} />
        </Card>
      ))}
    </div>
  );
}
