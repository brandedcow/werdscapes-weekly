import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const teams = await prisma.team.findMany({
    include: {
      players: true
    }
  });

  console.log("Teams found in database:");
  teams.forEach(team => {
    console.log(`\nTeam ID: ${team.id}`);
    console.log(`Name: ${team.name}`);
    console.log(`Player Count: ${team.players.length}`);
    if (team.players.length > 0) {
      console.log(`Sample Players: ${team.players.slice(0, 3).map(p => p.name).join(', ')}...`);
    }
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
