"use client";

import { TeamHistoryUploadForm } from "./team-history-upload-form";
import TeamHistoryList from "./team-history-list";
import {
  getPlayerTournamentScores,
  PlayerTournamentScore,
} from "@/data/getPlayerTournamentScores";
import useProfileStore from "@/store/useProfileStore";
import { useEffect, useState } from "react";

export function TeamHistoryCard() {
  const { playerName } = useProfileStore();
  const [scores, setScores] = useState<PlayerTournamentScore[]>([]);
  const [isUpload, setIsUpload] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data, success } = await getPlayerTournamentScores(playerName);
      if (success && data) setScores(data);
    };

    if (playerName != "") {
      fetchData();
    }
  }, [playerName]);

  return (
    <>
      {isUpload ? (
        <TeamHistoryUploadForm onCancel={() => setIsUpload(false)} />
      ) : (
        <TeamHistoryList scores={scores} onUpload={() => setIsUpload(true)} />
      )}
    </>
  );
}
