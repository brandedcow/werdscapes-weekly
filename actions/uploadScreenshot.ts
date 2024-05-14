"use server";

import { prisma } from "@/lib/db";
import sharp from "sharp";
import { ocrSpace, OcrSpaceOptions } from "ocr-space-api-wrapper";
import { bufferToBase64 } from "@/lib/utils";
import { parseOCRTokens } from "@/lib/parseOCRTokens";
import { TournamentType } from "@prisma/client";
import { startOfDay } from "date-fns";

const ocrAPIConfig: OcrSpaceOptions = {
  apiKey: process.env.OCR_SPACE_API_KEY,
  scale: true,
  isTable: true,
  OCREngine: "2",
};

type Scoreboard = {
  [playerName: string]: string;
};

export const uploadScreenshot = async (formData: FormData) => {
  try {
    // Get Form Data
    const tournamentDate = startOfDay(new Date(formData.get("date") as string));
    const teamName = formData.get("teamName") as string;
    const screenshots = formData.getAll("screenshots") as File[];

    // Query OCR API for scores
    /* Scoreboard after parsing
      const scoreboard = {
        jooslayer32: "2771",
        t54: "2499",
        daryl: "2443",
        Irenewz: "2117",
        SeeK: "1896",
        Bethan: "1656",
      };
    */
    const requests = screenshots.map(async (screenshot) => {
      const data = await screenshot.arrayBuffer();
      const buffer = Buffer.from(data);
      const croppedBuffer = await sharp(buffer)
        .extract({
          top: 1020,
          left: 280,
          width: 790,
          height: 1100,
        })
        .toBuffer();
      const ocrResult = await ocrSpace(
        bufferToBase64(croppedBuffer),
        ocrAPIConfig
      );
      return parseOCRTokens(ocrResult);
    });
    const parsedScores = await Promise.all(requests);
    const scoreboard: Scoreboard = Object.assign({}, ...parsedScores);

    // Update DB
    const team = await prisma.team.upsert({
      where: { name: teamName },
      create: { name: teamName },
      update: {},
    });

    const tournament = await prisma.tournament.upsert({
      where: {
        teamId_week_type: {
          teamId: team.id,
          week: tournamentDate,
          type: TournamentType.Team,
        },
      },
      create: {
        type: TournamentType.Team,
        teamId: team.id,
        week: tournamentDate,
        scores: {},
      },
      update: {},
    });

    await prisma.$transaction(
      Object.keys(scoreboard).map((playerName) =>
        prisma.player.upsert({
          where: { name: playerName },
          create: { name: playerName, teamId: team.id },
          update: {},
        })
      )
    );

    await prisma.score.createMany({
      data: Object.entries(scoreboard).map(([playerName, score]) => ({
        playerName,
        score: parseInt(score),
        tournamentId: tournament.id,
      })),
    });
  } catch (error) {
    console.error(error);
  }
};
