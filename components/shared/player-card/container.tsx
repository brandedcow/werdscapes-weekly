import getPlayerById from "@/data/getPlayerById";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NoDataFound } from "@/components/shared/no-data-found";
import { ScoreLineChart } from "./score-line-chart";
import { prisma } from "@/lib/db";
import { format } from "date-fns";
import { TrendsInfo } from "./player-trends-info";
interface PlayerCardProps {
  id: string;
}

export async function PlayerCard({ id }: PlayerCardProps) {
  const { success, data: player } = await getPlayerById(id);
  const scores = await prisma.score.findMany({
    where: { Player: { id } },
    include: { Tournament: true },
    orderBy: {
      Tournament: {
        week: "asc",
      },
    },
  });

  if (!success || !player) {
    return <NoDataFound type="player" description="No player found." />;
  }

  const lineGraphData = scores.map((score) => ({
    week: format(score.Tournament.week, "MMM d"),
    score: score.score,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{player.name}</CardTitle>
        <CardDescription>⛨ {player.Team.name}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-2">
        {/* <TrendsInfo /> */}

        <ScoreLineChart scores={lineGraphData} height={300} />
      </CardContent>
    </Card>
  );
}
