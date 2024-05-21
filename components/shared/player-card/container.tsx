import getPlayerById from "@/data/by-player-id/getPlayerById";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardSection,
  CardSectionContent,
  CardSectionTitle,
  CardTitle,
} from "@/components/ui/card";
import { NoDataFound } from "@/components/shared/no-data-found";
import { ScoreLineChart } from "./score-line-chart";
import { prisma } from "@/lib/db";
import { format } from "date-fns";
import { PlayerTrendsInfo } from "./player-trends-info";
import Link from "next/link";
import { DataTable } from "@/components/ui/data-table/table";
import { columns } from "./tournament-scores-columns";
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

  const transformedData = scores.map((score) => ({
    ...score,
    week: format(score.Tournament.week, "MMM d, y"),
    place: score.Tournament.place,
    teamName: score.Tournament.teamName,
    href: `/dashboard/tournament/${score.tournamentId}`,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{player.name}</CardTitle>
        <CardDescription>
          <Link href={`/dashboard/team/${player.Team.id}`}>
            ⛨ {player.Team.name}
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-4">
        <CardSection>
          <CardSectionTitle>Trends</CardSectionTitle>
          <PlayerTrendsInfo playerId={id} />
        </CardSection>
        <CardSection>
          <CardSectionTitle>Score History</CardSectionTitle>
          <CardSectionContent>
            <ScoreLineChart scores={lineGraphData} height={300} />
            <DataTable data={transformedData} columns={columns} />
          </CardSectionContent>
        </CardSection>
      </CardContent>
    </Card>
  );
}
