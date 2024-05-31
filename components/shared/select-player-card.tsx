"use client";

import { useUploadFormStore } from "@/data/useUploadFormStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { FindTeamForm } from "./forms/find-team-form";
import { Label } from "../ui/label";
import { SelectedInfo } from "./selected-info";
import { CreatePlayerForm } from "./forms/create-player-form";
import { FindPlayerForm } from "./forms/find-player-form";

export function SelectPlayerCard() {
  const { player } = useUploadFormStore();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Player</CardTitle>
        <CardDescription>
          Create a new player, or find one that already exists to upload scores
          to.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-4">
        <Tabs defaultValue="create">
          <TabsList className="w-full">
            <TabsTrigger value="create" className="flex-1">
              Create
            </TabsTrigger>
            <TabsTrigger value="find" className="flex-1">
              Find Existing
            </TabsTrigger>
          </TabsList>
          <TabsContent value="create">
            <CreatePlayerForm />
          </TabsContent>
          <TabsContent value="find">
            <FindPlayerForm />
          </TabsContent>
        </Tabs>
        <Card className="p-4 space-y-2 bg-secondary text-secondary-foreground">
          <Label>Selected Player</Label>
          <SelectedInfo item={player} />
        </Card>
      </CardContent>
    </Card>
  );
}
