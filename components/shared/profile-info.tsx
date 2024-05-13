import { Edit } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

interface ProfileInfoProps {
  playerName: string;
  teamName: string;
  onEdit: () => void;
}

export const ProfileInfo = ({
  playerName,
  teamName,
  onEdit,
}: ProfileInfoProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <div className="flex flex-col">
          <CardTitle>{playerName}</CardTitle>
          <CardDescription className="text-wrap break-all">
            ⛨ {teamName}
          </CardDescription>
        </div>
        <Button variant="outline" size="icon" onClick={() => onEdit()}>
          <Edit />
        </Button>
      </CardHeader>
    </Card>
  );
};
