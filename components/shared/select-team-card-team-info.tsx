import { Team } from "@prisma/client";

export function SelectTeamCardTeamInfo({ team }: { team: Team | null }) {
  return (
    <div>
      <div className="flex gap-x-2">
        <p className="text-sm text-muted-foreground">ID:</p>
        <p className="text-sm text-foreground">{!!team ? team.id : "none"}</p>
      </div>
      <div className="flex gap-x-2">
        <p className="text-sm text-muted-foreground">Name:</p>
        <p className="text-sm text-foreground">{!!team ? team.name : "none"}</p>
      </div>
    </div>
  );
}
