import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusSquare } from "lucide-react";
import Link from "next/link";
import { CardRightIconHeader } from "@/components/ui/card-right-icon-header";
import { TeamTournamentTable } from "./team-tournament-table/container";

export async function TeamTournamentHistoryCard({}) {
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
        <TeamTournamentTable />
      </CardContent>
    </Card>
  );
}
