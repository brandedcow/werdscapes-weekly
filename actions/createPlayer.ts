"use server";

import { createPlayerFormValues } from "@/components/shared/forms/create-player-form";
import { prisma } from "@/lib/db";

export default async function createPlayer(values: createPlayerFormValues) {
  try {
    const { name } = values;
    const data = await prisma.player.create({
      data: {
        name,
      },
    });
    return { success: true, data };
  } catch (error) {
    console.warn("createPlayer");
    return { success: false, error: "" };
  }
}
