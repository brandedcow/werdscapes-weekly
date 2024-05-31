"use server";

import { prisma } from "@/lib/db";

export async function deleteTeam(id: string) {
  try {
    const deletedTeam = await prisma.team.delete({
      where: { id },
    });

    const { name } = deletedTeam;

    let message = `Deleted Team ${name}`;
    return { success: true, data: message };
  } catch (error) {
    console.warn("deleteTeam", JSON.stringify(error, null, 2));
    return {
      success: false,
      error:
        "Something went wrong deleting team, likely this team no longer exists.",
    };
  }
}
