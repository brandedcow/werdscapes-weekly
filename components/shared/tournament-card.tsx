import { prisma } from "@/lib/db";
import { Card, CardContent, CardTitle } from "../ui/card";
import { addDays, format } from "date-fns";
import { ScoreList } from "./score-list";
import { CardRightIconHeader } from "../ui/card-right-icon-header";
import { Button } from "../ui/button";
import { Edit } from "lucide-react";
import Link from "next/link";

interface TournamentCardProps {
  id: string;
}

export default async function TournamentCard({ id }: TournamentCardProps) {
  const tournament = await prisma.tournament.findFirst({
    where: { id },
    include: {
      Team: true,
      scores: true,
    },
  });

  if (!tournament) {
    return (
      <Card>
        <CardTitle>No tournament found</CardTitle>
      </Card>
    );
  }

  const { type, week, scoreTotal, Team, scores } = tournament;

  const tournamentStartDate = new Date(week);
  const tournamentDateRange = `${format(
    tournamentStartDate,
    "MMM d, y"
  )} – ${format(addDays(tournamentStartDate, 3), "MMM d, y")}`;

  return (
    <Card>
      <CardRightIconHeader
        title={Team.name}
        description={format(tournamentStartDate, "MMMM d, y")}
        renderIcon={() => (
          <Button variant="outline" size="icon">
            <Link href={`/dashboard/tournaments/${id}/edit`}>
              <Edit />
            </Link>
          </Button>
        )}
      />
      <CardContent>
        <ScoreList scores={scores} scoreTotal={scoreTotal} />
      </CardContent>
    </Card>
  );
}
