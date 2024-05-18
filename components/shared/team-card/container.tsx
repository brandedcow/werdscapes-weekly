import { Card, CardHeader } from "@/components/ui/card";
import getTeamById from "@/data/getTeamById";

interface TeamCardProps {
  id: string;
}

export const TeamCard = async ({ id }: TeamCardProps) => {
  const team = await getTeamById(id);

  return (
    <Card>
      <CardHeader>{}</CardHeader>
    </Card>
  );
};
