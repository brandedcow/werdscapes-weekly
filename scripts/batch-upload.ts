import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { parseISO, parse } from 'date-fns';

const prisma = new PrismaClient();

// The Team ID for "Creased" found in the database
const TEAM_ID = "clwllga6k0001s3u417hpgtmy";
const TEAM_NAME = "Creased";

async function uploadData(resultPath: string) {
  if (!fs.existsSync(resultPath)) {
    console.error(`File not found: ${resultPath}`);
    return;
  }

  const rawData = fs.readFileSync(resultPath, 'utf8');
  const data = JSON.parse(rawData);

  // Parse the week string (YYYYMMDD) to a Date object
  // Assuming the date represents a Friday as per the form logic, or just a generic week marker.
  // The 'date-fns' parse function helps turn '20250414' into a proper Date object.
  const weekDate = parse(data.week, 'yyyyMMdd', new Date());

  console.log(`\nUploading data for week: ${data.week}`);

  try {
    const results = await prisma.$transaction(
      async (tx) => {
        // 1. Upsert the Team Tournament
        const tournament = await tx.teamTournament.upsert({
          where: {
            teamId_week: {
              teamId: TEAM_ID,
              week: weekDate,
            },
          },
          create: {
            week: weekDate,
            place: data.place || 0,
            teamId: TEAM_ID,
            scoreTotal: data.scores.reduce((acc: number, curr: any) => acc + curr.score, 0),
          },
          update: {
            place: data.place || 0,
            scoreTotal: data.scores.reduce((acc: number, curr: any) => acc + curr.score, 0),
          },
        });

        console.log(`Tournament Upserted: ID ${tournament.id}`);

        let newPlayerCount = 0;
        let scoreCount = 0;

        // 2. Process each score
        for (const item of data.scores) {
          const { name, score } = item;

          // Find if player exists for this team by name
          let player = await tx.player.findFirst({
            where: {
              name: name,
              teamId: TEAM_ID
            }
          });

          // Create player if they don't exist
          if (!player) {
            player = await tx.player.create({
              data: {
                name: name,
                teamId: TEAM_ID,
              },
            });
            newPlayerCount++;
          }

          // Upsert the TournamentScore
          await tx.tournamentScore.upsert({
            where: {
              playerId_teamTournamentId: {
                playerId: player.id,
                teamTournamentId: tournament.id,
              },
            },
            create: {
              score: score,
              playerId: player.id,
              teamTournamentId: tournament.id,
            },
            update: {
              score: score,
            },
          });
          scoreCount++;
        }
        
        return { tournamentId: tournament.id, newPlayerCount, scoreCount };
      },
      {
        timeout: 20000, 
      }
    );

    console.log(`Success! Inserted/Updated ${results.scoreCount} scores. Created ${results.newPlayerCount} new players.`);

  } catch (error) {
    console.error(`Error uploading data for week ${data.week}:`, error);
  }
}

async function main() {
  const targetDir = process.argv[2];
  
  if (!targetDir) {
     console.error("Usage: ts-node scripts/batch-upload.ts <directory_containing_json>");
     process.exit(1);
  }

  const resultFile = path.join(targetDir, 'processed_results.json');
  await uploadData(resultFile);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });