import { Card, CardContent } from "../ui/card";
import { addDays, format } from "date-fns";
import { ScoreList } from "./score-list";
import { CardRightIconHeader } from "../ui/card-right-icon-header";
import { Button } from "../ui/button";
import { Edit } from "lucide-react";
import Link from "next/link";
import getTournamentById from "@/data/getTournamentById";
import { NoDataFound } from "./no-data-found";

interface TournamentCardProps {
  id: string;
}

export default async function TournamentCard({ id }: TournamentCardProps) {
  const { success, data } = await getTournamentById(id);

  if (!success || !data) {
    return (
      <NoDataFound
        type="tournament"
        description="There is no tournament data to be seen here. Since there is no public
    API to fetch it for us, to see data, please upload manually."
        linkHref="/dashboard/upload-scores"
        buttonLabel="Upload Scores"
      />
    );
  }

  const { week, Team, place } = data;

  const tournamentStartDate = new Date(week);
  const tournamentDateRange = `${format(
    tournamentStartDate,
    "MMM d, y"
  )} – ${format(addDays(tournamentStartDate, 3), "MMM d, y")}`;

  return (
    <Card>
      <CardRightIconHeader
        title={`#${place} ${Team.name}`}
        titleHref={`/dashboard/team/${Team.id}`}
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
        <ScoreList tournamentId={id} />
      </CardContent>
    </Card>
  );
}
