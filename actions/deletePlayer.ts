"use server";

import { prisma } from "@/lib/db";

export async function deletePlayer(id: string) {
  try {
    const deletedPlayer = await prisma.player.delete({
      where: { id },
    });

    const { name } = deletedPlayer;

    let message = `Deleted player ${name}`;
    return { success: true, data: message };
  } catch (error) {
    console.warn("deletePlayer", JSON.stringify(error, null, 2));
    return {
      success: false,
      error:
        "Something went wrong deleting player, likely this player no longer exists.",
    };
  }
}
