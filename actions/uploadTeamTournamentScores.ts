"use server";

import { prisma } from "@/lib/db";
import { format } from "date-fns";
import { uploadTeamScoresFormValues } from "@/components/shared/forms/upload-team-scores-form";
import { Player } from "@prisma/client";

export const uploadTeamTournamentScores = async (
  formData: uploadTeamScoresFormValues
) => {
  try {
    const { scores, team, week, place } = formData;

    const scoreTotal = scores.reduce(
      (acc, score) => acc + parseInt(score.score),
      0
    );

    const results = await prisma.$transaction(
      async (tx) => {
        const tournament = await tx.teamTournament.upsert({
          where: {
            teamId_week: {
              teamId: team.id,
              week,
            },
          },
          create: {
            week,
            place,
            teamId: team.id,
            scoreTotal,
          },
          update: {
            scoreTotal,
          },
        });

        let createdPlayers: Player[] = [];

        for (const item of scores) {
          const { name, playerId, score } = item;

          if (playerId === "") {
            const newPlayer = await tx.player.create({
              data: {
                name,
                teamId: team.id,
              },
            });
            createdPlayers.push(newPlayer);
          } else {
            await tx.player.update({
              where: { id: playerId },
              data: { name },
            });
          }

          await tx.tournamentScore.upsert({
            where: {
              playerId_teamTournamentId: {
                playerId:
                  playerId === ""
                    ? createdPlayers[createdPlayers.length - 1].id
                    : playerId,
                teamTournamentId: tournament.id,
              },
            },
            create: {
              score,
              playerId:
                playerId === ""
                  ? createdPlayers[createdPlayers.length - 1].id
                  : playerId,
              teamTournamentId: tournament.id,
            },
            update: {
              score,
            },
          });
        }
        return createdPlayers;
      },
      {
        timeout: 20000, // default: 5000
      }
    );

    // TODO: Update results.length to reflect correct number of scores updated
    const message = `Created ${results.length} new scores for ${
      team.name
    } on ${format(new Date(week), "MMM d, y")}.`;

    return { success: true, data: message };
  } catch (error: any) {
    console.error(
      "uploadTeamTournamentScores",
      JSON.stringify(error, null, 2),
      error
    );
    let errorMessage = "Something went wrong while uploading scores.";
    return { success: false, error: errorMessage };
  }
};
