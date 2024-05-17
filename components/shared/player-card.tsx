import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface PlayerCardProps {
  id: string;
}

export function PlayerCard({ id }: PlayerCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Player Name</CardTitle>
        <CardDescription>⛨ Team Name</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}
