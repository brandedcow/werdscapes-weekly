import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import Link from "next/link";

type EditTeamTournamentButtonProps = {
  id: string;
} & React.HTMLAttributes<HTMLButtonElement>;

export async function EditTeamTournamentButton({
  id,
  ...props
}: EditTeamTournamentButtonProps) {
  return (
    <Button size="icon" variant="outline" {...props}>
      <Link href={`/team-tournament/edit/${id}`}>
        <Edit />
      </Link>
    </Button>
  );
}
