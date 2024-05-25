"use server";

import { prisma } from "@/lib/db";

export default async function getTeamMembersByTeamId(id: string) {
  try {
    const team = await prisma.team.findFirst({
      where: { id },
      include: {
        players: true,
      },
    });

    if (!team) throw Error("No Team Found");

    return { success: true, data: team.players };
  } catch (error) {
    console.warn("getTeamMembersByTeamId");
    return { success: false };
  }
}
