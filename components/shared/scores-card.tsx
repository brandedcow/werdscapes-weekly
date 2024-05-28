import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import getScoresByTournamentId from "@/data/by-tournament-id/getScoresByTournamentId";
import { TeamTournamentScoresTable } from "./tables/team-tournament-scores-table/container";

export async function ScoresCard({ tournamentId }: { tournamentId: string }) {
  const scores = await getScoresByTournamentId(tournamentId);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scores</CardTitle>
      </CardHeader>
      <CardContent>
        <TeamTournamentScoresTable tournamentId={tournamentId} />
      </CardContent>
    </Card>
  );
}
