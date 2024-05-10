import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";

export function ProfileCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Profile</CardTitle>
        <CardDescription>
          Enter your player and team names to track stats.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-3">
        <div className="flex flex-col">
          <div className="flex mt-2">
            <Input placeholder="Player name" />
            <Button>Submit</Button>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex mt-2">
            <Input placeholder="Team name" />
            <Button>Submit</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
