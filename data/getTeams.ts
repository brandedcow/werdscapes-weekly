"use server";

import { prisma } from "@/lib/db";

export default async function getTeams(query?: string) {
  try {
    const results = await prisma.team.findMany({
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
      take: 5,
    });

    return { success: true, data: results };
  } catch (error) {
    console.warn("getTeams");
    return { success: false };
  }
}
