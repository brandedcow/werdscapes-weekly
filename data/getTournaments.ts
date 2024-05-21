"use server";

import { prisma } from "@/lib/db";

export default async function getTournaments(teamId?: string) {
  try {
    const data = await prisma.tournament.findMany({
      where: { Team: { id: teamId } },
      orderBy: {
        week: "desc",
      },
      include: {
        Team: true,
      },
    });
    return { success: true, data };
  } catch (error) {
    console.error("getTournaments", error);
    return { success: false, error };
  }
}
