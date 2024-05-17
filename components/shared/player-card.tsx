import getPlayerById from "@/data/getPlayerById";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { NoDataFound } from "./no-data-found";

interface PlayerCardProps {
  id: string;
}

export async function PlayerCard({ id }: PlayerCardProps) {
  const { success, data: player } = await getPlayerById(id);

  if (!success || !player) {
    return <NoDataFound type="player" description="No player found." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{player.name}</CardTitle>
        <CardDescription>⛨ {player.Team.name}</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}
