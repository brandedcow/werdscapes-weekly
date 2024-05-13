import { PlusSquare } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

interface TeamHistoryListProps {
  onUpload: () => void;
}

export default function TeamHistoryList({ onUpload }: TeamHistoryListProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <div>
          <CardTitle>Tournament History</CardTitle>
        </div>
        <Button variant="outline" size="icon" onClick={onUpload}>
          <PlusSquare />
        </Button>
      </CardHeader>
    </Card>
  );
}
