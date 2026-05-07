import { PrismaClient } from '@prisma/client';
import { parse } from 'date-fns';

const prisma = new PrismaClient();
const TEAM_ID = "clwllga6k0001s3u417hpgtmy"; // Creased
const WEEK_STR = "20250414";

async function main() {
  const weekDate = parse(WEEK_STR, 'yyyyMMdd', new Date());

  const tournament = await prisma.teamTournament.findUnique({
    where: {
      teamId_week: {
        teamId: TEAM_ID,
        week: weekDate,
      },
    },
    include: {
      scores: {
        include: {
          Player: true
        }
      }
    }
  });

  if (!tournament) {
    console.error(`Could not find tournament for week ${WEEK_STR}`);
    return;
  }

  console.log(`Found Tournament!`);
  console.log(`ID: ${tournament.id}`);
  console.log(`Place: ${tournament.place}`);
  console.log(`Total Score: ${tournament.scoreTotal}`);
  console.log(`\nScores Recorded (${tournament.scores.length}):`);
  
  // Sort for display
  const sortedScores = tournament.scores.sort((a, b) => b.score - a.score);
  
  sortedScores.slice(0, 5).forEach((s, index) => {
     console.log(`${index + 1}. ${s.Player.name} - ${s.score}`);
  });
  console.log(`... and ${sortedScores.length - 5} more.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });