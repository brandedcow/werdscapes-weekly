"use client";

import useProfileStore from "@/store/useProfileStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Edit, Plus, PlusSquare } from "lucide-react";
import { Label } from "../ui/label";
import { useState } from "react";
import { TeamHistoryUploadForm } from "./team-history-upload-form";
import TeamHistoryList from "./team-history-list";

export function TeamHistoryCard() {
  const { playerName, teamName } = useProfileStore();
  // TODO: change default isUpload to reflect if there is any data fetched from backend.
  const [isUpload, setIsUpload] = useState<boolean>(true);

  const handleSubmit = async (values: any) => {
    // TODO: handle server action
    setIsUpload(false);
  };

  return (
    <>
      {isUpload ? (
        <TeamHistoryUploadForm
          onSubmit={handleSubmit}
          onCancel={() => setIsUpload(false)}
        />
      ) : (
        <TeamHistoryList onUpload={() => setIsUpload(true)} />
      )}
    </>
  );
}
