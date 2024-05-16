import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  EditTournamentForm,
  editTournamentFormValues,
} from "./edit-tournament-form";
import getTournamentById from "@/data/getTournament";

interface EditTournamentCardProps {
  id: string;
}

export async function EditTournamentCard({ id }: EditTournamentCardProps) {
  const { data, success } = await getTournamentById(id);

  if (!success || !data) {
    return (
      <Card>
        <CardTitle>No tournament found</CardTitle>
      </Card>
    );
  }

  const { week, Team, scores, place } = data;

  const defaultValues: editTournamentFormValues = {
    scores: scores.map((score) => ({
      ...score,
      score: score.score.toString(),
    })),
    week,
    teamName: Team.name,
    place,
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Tournament</CardTitle>
      </CardHeader>
      <CardContent>
        <EditTournamentForm id={id} defaultValues={defaultValues} />
      </CardContent>
    </Card>
  );
}
