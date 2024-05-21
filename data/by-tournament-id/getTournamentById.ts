import { prisma } from "@/lib/db";

export default async function getTournamentById(id: string) {
  try {
    const tournament = await prisma.tournament.findFirst({
      where: { id },
      include: {
        Team: true,
        scores: {
          orderBy: {
            score: "desc",
          },
        },
      },
    });

    return { success: true, data: tournament };
  } catch (error) {
    console.error("getTournament", error);
    return { success: false, error };
  }
}
