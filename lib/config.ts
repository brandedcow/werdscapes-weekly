import { OcrSpaceOptions } from "ocr-space-api-wrapper";

export const ocrAPIConfig: OcrSpaceOptions = {
  apiKey: process.env.OCR_SPACE_API_KEY,
  scale: true,
  isTable: true,
  OCREngine: "2",
};
