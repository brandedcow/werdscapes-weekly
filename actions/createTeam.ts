"use server";

import { createTeamFormValues } from "@/components/shared/forms/create-team-form";
import { prisma } from "@/lib/db";

export default async function createTeam(values: createTeamFormValues) {
  try {
    const team = await prisma.team.create({
      data: {
        name: values.name,
      },
    });
    return { success: true, data: team };
  } catch (error) {
    console.warn("createTeam", JSON.stringify(error, null, 2));
    return { success: false, error: "createTeam" };
  }
}
