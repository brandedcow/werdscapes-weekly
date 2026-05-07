
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { ocrSpace, OcrSpaceOptions } from 'ocr-space-api-wrapper';
import * as dotenv from 'dotenv';
import { parseOCRTokens } from '../lib/parseOCRTokens';

// Load environment variables
dotenv.config({ path: '.env.local' });

const OCR_API_KEY = process.env.OCR_SPACE_API_KEY;

if (!OCR_API_KEY) {
  console.error("Error: OCR_SPACE_API_KEY is not set in .env.local");
  process.exit(1);
}

const ocrAPIConfig: OcrSpaceOptions = {
  apiKey: OCR_API_KEY,
  scale: true,
  isTable: true,
  OCREngine: "2",
};

const bufferToBase64 = (buffer: Buffer) =>
  `data:image/jpeg;base64,${buffer.toString("base64")}`;

async function processImage(filePath: string) {
  console.log(`Processing: ${path.basename(filePath)}`);
  const ssBuffer = fs.readFileSync(filePath);

  // Extract place (only needed from the first image usually, but let's try to get it)
  // Logic from scanScreenshot.ts
  const croppedPlace = await sharp(ssBuffer)
    .extract({ top: 480, left: 170, width: 120, height: 100 })
    .toBuffer();

  const placeResult = await ocrSpace(bufferToBase64(croppedPlace), ocrAPIConfig);
  const place = placeResult.ParsedResults[0].ParsedText.replaceAll(
    /[\r\n\t\D]/g,
    ""
  );

  // Extract scores
  const croppedScores = await sharp(ssBuffer)
    .extract({
      top: 1000,
      left: 0,
      width: 1200,
      height: 1300,
    })
    .jpeg({
      quality: 50,
    })
    .toBuffer();

  const ocrResult = await ocrSpace(
    bufferToBase64(croppedScores),
    ocrAPIConfig
  );
  
  const scoreboard = parseOCRTokens(ocrResult);
  
  return { place, scoreboard };
}

async function main() {
  const dirPath = process.argv[2];

  if (!dirPath) {
    console.error("Usage: ts-node scripts/process-folder.ts <directory_path>");
    process.exit(1);
  }

  const absolutePath = path.resolve(dirPath);
  if (!fs.existsSync(absolutePath)) {
    console.error(`Error: Directory not found at ${absolutePath}`);
    process.exit(1);
  }

  const files = fs.readdirSync(absolutePath).filter(f => 
    f.toLowerCase().endsWith('.png') || f.toLowerCase().endsWith('.jpg') || f.toLowerCase().endsWith('.jpeg')
  ).sort();

  console.log(`Found ${files.length} images in ${absolutePath}`);

  const results: any[] = [];
  
  for (const file of files) {
    try {
      const res = await processImage(path.join(absolutePath, file));
      results.push({ file, ...res });
      // Small delay to respect free tier rate limits if necessary
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (err) {
      console.error(`Failed to process ${file}:`, err);
    }
  }

  // Aggregate scoreboard
  const finalScoreboard: Record<string, string> = {};
  let finalPlace = "0";

  results.forEach(res => {
    Object.assign(finalScoreboard, res.scoreboard);
    if (res.place && res.place !== "0" && finalPlace === "0") {
      finalPlace = res.place;
    }
  });

  const output = {
    week: path.basename(absolutePath), // Use folder name as week
    place: parseInt(finalPlace) || 0,
    scores: Object.entries(finalScoreboard)
      .map(([name, score]) => ({
        name,
        score: parseInt(score)
      }))
      .filter(s => {
        // Filter out purely numeric names (usually OCR noise for rank or rank numbers)
        const isNumericName = /^\d+$/.test(s.name);
        return !isNumericName && !isNaN(s.score);
      })
      .sort((a, b) => b.score - a.score)
  };

  const outputFilePath = path.join(absolutePath, 'processed_results.json');
  fs.writeFileSync(outputFilePath, JSON.stringify(output, null, 2));
  console.log(`\nProcessing complete! Results saved to: ${outputFilePath}`);
}

main();
