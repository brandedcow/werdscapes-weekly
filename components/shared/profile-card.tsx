"use client";

import useProfileStore from "@/store/useProfileStore";
import { ProfileForm, profileFormValues } from "./profile-form";
import { useState } from "react";
import { ProfileInfo } from "./profile-info";

export function ProfileCard() {
  const { playerName, teamName, setPlayerName, setTeamName } =
    useProfileStore();
  const isTracking = !!playerName && !!teamName;
  const [isEdit, setIsEdit] = useState<boolean>(!isTracking);

  const handleSubmit = (values: profileFormValues) => {
    setPlayerName(values.playerName);
    setTeamName(values.teamName);
    setIsEdit(false);
  };

  return (
    <>
      {isEdit ? (
        <ProfileForm
          onSubmit={handleSubmit}
          onCancel={() => setIsEdit(false)}
        />
      ) : (
        <ProfileInfo
          playerName={playerName}
          teamName={teamName}
          onEdit={() => setIsEdit(true)}
        />
      )}
    </>
  );
}
