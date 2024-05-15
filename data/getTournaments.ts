"use server";

import { prisma } from "@/lib/db";

export default async function getTournaments() {
  try {
    const data = await prisma.tournament.findMany({
      where: {},
      include: {
        scores: true,
        Team: true,
      },
    });
    return { success: true, data };
  } catch (error) {
    console.error("getTournaments", error);
    return { success: false, error };
  }
}
