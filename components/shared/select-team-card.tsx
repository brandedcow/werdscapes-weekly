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
import { CreateTeamForm } from "./forms/create-team-form";
import { FindTeamForm } from "./forms/find-team-form";
import { Label } from "../ui/label";
import { SelectTeamCardTeamInfo } from "./select-team-card-team-info";

export function SelectTeamCard() {
  const { team } = useUploadFormStore();

  console.log(team);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Team</CardTitle>
        <CardDescription>
          Create a new team, or find one that already exists to upload scores
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
            <CreateTeamForm />
          </TabsContent>
          <TabsContent value="find">
            <FindTeamForm />
          </TabsContent>
        </Tabs>
        <Card className="p-4 space-y-2 bg-secondary text-secondary-foreground">
          <Label>Selected Team</Label>
          <SelectTeamCardTeamInfo team={team} />
        </Card>
      </CardContent>
    </Card>
  );
}
