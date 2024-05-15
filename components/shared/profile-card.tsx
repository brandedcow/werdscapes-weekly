"use client";

import useProfileStore from "@/data/useProfileStore";
import { ProfileForm, profileFormValues } from "./profile-form";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (!!playerName && !!teamName) setIsEdit(false);
  }, [playerName, teamName]);

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
