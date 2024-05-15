import { prisma } from "@/lib/db";
import { Card, CardContent, CardTitle } from "../ui/card";
import { addDays, format } from "date-fns";
import { ScoreList } from "./score-list";
import { CardRightIconHeader } from "../ui/card-right-icon-header";
import { Button } from "../ui/button";
import { Edit } from "lucide-react";
import Link from "next/link";
import getTournamentById from "@/data/getTournament";

interface TournamentCardProps {
  id: string;
}

export default async function TournamentCard({ id }: TournamentCardProps) {
  const { success, data } = await getTournamentById(id);

  if (!success || !data) {
    return (
      <Card>
        <CardTitle>No tournament found</CardTitle>
      </Card>
    );
  }

  const { week, scoreTotal, Team, scores } = data;

  const tournamentStartDate = new Date(week);
  const tournamentDateRange = `${format(
    tournamentStartDate,
    "MMM d, y"
  )} – ${format(addDays(tournamentStartDate, 3), "MMM d, y")}`;

  return (
    <Card>
      <CardRightIconHeader
        title={Team.name}
        description={tournamentDateRange}
        renderIcon={() => (
          <Button variant="outline" size="icon">
            <Link href={`/dashboard/team-tournament/edit/${id}`}>
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
