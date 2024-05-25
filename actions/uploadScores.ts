"use server";

import { prisma } from "@/lib/db";
import { TournamentType } from "@prisma/client";
import { format } from "date-fns";
import { uploadScoresFormValues } from "@/components/shared/upload-scores-card/upload-scores-form";

export const uploadScores = async (formData: uploadScoresFormValues) => {
  try {
    const { scores, teamName, week, place } = formData;

    const team = await prisma.team.upsert({
      where: { name: teamName },
      create: { name: teamName },
      update: {},
    });

    const scoreTotal = scores.reduce(
      (acc, score) => acc + parseInt(score.score),
      0
    );

    const tournament = await prisma.tournament.upsert({
      where: {
        teamName_week_type: {
          teamName,
          week,
          type: TournamentType.Team,
        },
      },
      create: {
        teamName,
        week,
        place,
        scoreTotal,
      },
      update: {},
    });

    await prisma.$transaction(
      scores.map(({ name }) =>
        prisma.player.upsert({
          where: {
            name,
          },
          create: { name, teamId: team.id },
          update: {},
        })
      )
    );

    await prisma.$transaction(
      scores.map(({ name, score }) =>
        prisma.score.upsert({
          where: {
            playerName_tournamentId: {
              playerName: name,
              tournamentId: tournament.id,
            },
          },
          create: {
            playerName: name,
            score: parseInt(score),
            tournamentId: tournament.id,
          },
          update: {},
        })
      )
    );

    const message = `Added ${scores.length} scores for ${team.name} on ${format(
      new Date(week),
      "MMM d, y"
    )}.`;

    return { success: true, data: message };
  } catch (error: any) {
    console.error("uploadScores", JSON.stringify(error, null, 2));
    let errorMessage = "Something went wrong while uploading scores.";
    return { success: false, error: errorMessage };
  }
};
