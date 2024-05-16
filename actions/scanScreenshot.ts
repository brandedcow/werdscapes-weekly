"use server";

import { ocrAPIConfig } from "@/lib/config";
import { parseOCRTokens } from "@/lib/parseOCRTokens";
import { bufferToBase64 } from "@/lib/utils";
import { ocrSpace } from "ocr-space-api-wrapper";
import sharp from "sharp";

type Scoreboard = {
  [playerName: string]: string;
};

export const scanScreenshot = async (formData: FormData) => {
  try {
    const screenshots = formData.getAll("screenshots") as File[];

    // Extract place
    const ssData = await screenshots[0].arrayBuffer();
    const ssBuffer = Buffer.from(ssData);
    const cropped = await sharp(ssBuffer)
      .extract({ top: 530, left: 190, width: 70, height: 100 })
      .toBuffer();

    const ocrResult = await ocrSpace(bufferToBase64(cropped), ocrAPIConfig);
    const place = ocrResult.ParsedResults[0].ParsedText.replaceAll(
      /[\r\n\t\D]/g,
      ""
    );

    // Extract scores
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

    return { success: true, data: { scoreboard, place } };
  } catch (error) {
    console.error("scanScreenshot", error);
    return { success: false, error };
  }
};
