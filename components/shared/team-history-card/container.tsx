import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusSquare } from "lucide-react";
import Link from "next/link";
import { TeamTournamentList } from "./team-tournament-list";
import getTournaments from "@/data/getTournaments";
import { CardRightIconHeader } from "@/components/ui/card-right-icon-header";

export async function TeamHistoryCard({}) {
  // TODO: sort tournaments by date, include options in table to sort
  const { data } = await getTournaments();

  return (
    <Card>
      <CardRightIconHeader
        title="Team Tournament History"
        description="If a tournament for the week already exists, uploaded scores will update the existing tournament."
        renderIcon={() => (
          <Button size="icon" variant="outline">
            <Link href="/dashboard/upload-scores">
              <PlusSquare />
            </Link>
          </Button>
        )}
      />
      <CardContent>
        <TeamTournamentList tournaments={data ?? []} />
      </CardContent>
    </Card>
  );
}
