"use server";

import { prisma } from "@/lib/db";

export default async function getPlayers(query: string) {
  try {
    const results = await prisma.player.findMany({
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
    console.warn("getPlayers");
    return { success: false };
  }
}
