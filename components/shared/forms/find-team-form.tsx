"use client";

import { Label } from "@/components/ui/label";
import { Team } from "@prisma/client";
import { useState } from "react";
import { z } from "zod";
import { useDebouncedCallback } from "use-debounce";
import getTeams from "@/data/getTeams";
import { v4 } from "uuid";
import { SelectTeamCardTeamInfo } from "../select-team-card-team-info";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useUploadFormStore } from "@/data/useUploadFormStore";

const findTeamFormSchema = z.object({
  name: z.string().min(1),
});

export type findTeamFormValues = z.infer<typeof findTeamFormSchema>;

export function FindTeamForm() {
  const [searchResults, setSearchResults] = useState<Team[]>([]);
  const { setTeam } = useUploadFormStore();

  const debouncedSearch = useDebouncedCallback(
    async (value: string) => {
      const { success, data } = await getTeams(value);

      if (!success || data === undefined) return;

      setSearchResults(() => data);
    },
    300,
    { maxWait: 2000 }
  );

  return (
    <div className="space-y-2">
      <Label>Find Team</Label>
      <Input
        placeholder="Search by Team Name"
        onChange={(event) => debouncedSearch(event.target.value)}
      />
      {searchResults.map((team) => (
        <Card
          key={v4()}
          className="p-2 hover:bg-secondary transition-colors"
          onClick={() => setTeam(team)}
        >
          <SelectTeamCardTeamInfo team={team} />
        </Card>
      ))}
    </div>
  );
}
