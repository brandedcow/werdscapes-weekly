"use server";

import { prisma } from "@/lib/db";
import { TournamentType } from "@prisma/client";
import { format } from "date-fns";
import { uploadFormValues } from "@/components/shared/upload-screenshot-card/upload-form";

export const uploadData = async (formData: uploadFormValues) => {
  try {
    const { scores, teamName, week } = formData;

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
        teamId_week_type: {
          teamId: team.id,
          week,
          type: TournamentType.Team,
        },
      },
      create: {
        type: TournamentType.Team,
        teamId: team.id,
        week,
        scores: {},
        scoreTotal,
      },
      update: {},
    });

    await prisma.$transaction(
      scores.map(({ name, score }) =>
        prisma.player.upsert({
          where: {
            name,
          },
          create: { name, teamId: team.id },
          update: {},
        })
      )
    );

    const { count: scoreCount } = await prisma.score.createMany({
      data: scores.map(({ name, score }) => ({
        playerName: name,
        score: parseInt(score),
        tournamentId: tournament.id,
      })),
      skipDuplicates: true,
    });

    const message = `Added ${scoreCount} scores for ${team.name} on ${format(
      new Date(week),
      "MMM d, y"
    )}`;
    return { success: true, data: message };
  } catch (error) {
    console.error(error);
    return { success: false, error };
  }
};
