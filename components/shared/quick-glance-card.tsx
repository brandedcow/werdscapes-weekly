import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { PlayerStats } from "./stat-cards/player-stats";
import TeamStats from "./stat-cards/team-stats";
import { TournamentStats } from "./stat-cards/tournament-stats";

export function QuickGlanceCard({
  id,
  type,
}: {
  type?: "team" | "player" | "individual" | "tournament";
  id?: string;
}) {
  if (!id) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Glance</CardTitle>
      </CardHeader>
      <CardContent>
        {type === "team" ? (
          <TeamStats id={id} />
        ) : type === "tournament" ? (
          <TournamentStats id={id} />
        ) : type === "player" ? (
          <PlayerStats id={id} />
        ) : null}
      </CardContent>
    </Card>
  );
}
