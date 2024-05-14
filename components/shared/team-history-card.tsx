"use client";

import useProfileStore from "@/store/useProfileStore";
import { useState } from "react";
import {
  teamHistoryFormValues,
  TeamHistoryUploadForm,
} from "./team-history-upload-form";
import TeamHistoryList from "./team-history-list";
import { uploadScreenshot } from "@/actions/uploadScreenshot";

export function TeamHistoryCard() {
  const { playerName, teamName } = useProfileStore();
  // TODO: change default isUpload to reflect if there is any data fetched from backend.
  const [isUpload, setIsUpload] = useState<boolean>(true);

  const handleSubmit = async (values: teamHistoryFormValues) => {
    const formData = new FormData();
    formData.append("date", values.date.toISOString());
    formData.append("teamName", values.teamName);

    for (const file of values.screenshots) {
      formData.append("screenshots", file);
    }

    await uploadScreenshot(formData);
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
