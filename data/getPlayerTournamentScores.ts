"use server";

import { prisma } from "@/lib/db";

export type PlayerTournamentScore = {
  id: string;
  score: number;
  playerName: string;
  tournamentId: string;
  Tournament: {
    id: string;
    week: Date;
    Team: {
      name: string;
    };
  };
};

export const getPlayerTournamentScores = async (
  playerName: string
): Promise<{
  data?: PlayerTournamentScore[];
  error?: any;
  success: boolean;
}> => {
  try {
    const scores = await prisma.score.findMany({
      where: {
        playerName,
      },
      include: {
        Tournament: {
          include: {
            Team: true,
          },
        },
      },
    });

    return { data: scores, success: true };
  } catch (error) {
    console.error(error);
    return { error, success: false };
  }
};
