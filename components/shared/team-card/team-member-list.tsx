import { prisma } from "@/lib/db";

export const TeamMemberList = async () => {
  const players = await prisma.player.findMany({
    include: {
      scores: true,
    },
  });
};
