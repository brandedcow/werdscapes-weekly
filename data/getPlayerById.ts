import { prisma } from "@/lib/db";

export default async function getPlayerById(id: string) {
  try {
    const player = await prisma.player.findFirst({
      where: { id },
      include: { Team: true },
    });

    return { success: true, data: player };
  } catch (error) {
    console.warn("getPlayerById", JSON.stringify(error, null, 2));
    return {
      success: false,
      error: "Something went wrong fetching player info.",
    };
  }
}
