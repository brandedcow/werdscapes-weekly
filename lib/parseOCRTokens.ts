import { OcrSpaceResponse } from "ocr-space-api-wrapper";

export function parseOCRTokens(ocrResult: OcrSpaceResponse) {
  let tokens = ocrResult.ParsedResults[0].ParsedText.split("\t")
    .map((token) => token.replace("\r\n", ""))
    .filter((token) => token !== "" && token !== "0");

  const adjustedTokens = pairElements(addZeroScores(tokens));

  return adjustedTokens.reduce<{ [id: string]: string }>((acc, curr) => {
    const [id, score] = curr;
    if (acc[id] === undefined) {
      acc[id] = score;
    }
    return acc;
  }, {});
}

function addZeroScores(tokens: string[]) {
  const scoresToAdd = 12 - tokens.length;
  if (scoresToAdd === 0) {
    return tokens;
  }

  const tokensWithoutScores = tokens.slice(-scoresToAdd);
  const addZeroScores = [...tokensWithoutScores.flatMap((id) => [id, "0"])];
  const updatedTokens = [...tokens.slice(0, -scoresToAdd), ...addZeroScores];
  return updatedTokens;
}

function pairElements(array: any[]) {
  let newArray: any[] = [];

  for (let index = 0; index < array.length; index += 2) {
    const tuple = [array[index], array[index + 1]];
    newArray.push(tuple);
  }
  return newArray;
}
