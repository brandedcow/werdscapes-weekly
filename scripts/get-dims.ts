
import sharp from 'sharp';
import path from 'path';

async function getDims(filePath: string) {
  const metadata = await sharp(filePath).metadata();
  console.log(JSON.stringify(metadata, null, 2));
}

getDims(process.argv[2]);
