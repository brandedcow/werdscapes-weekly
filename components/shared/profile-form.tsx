import useProfileStore from "@/store/useProfileStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const profileFormSchema = z.object({
  playerName: z.string().min(1),
  teamName: z.string().min(1),
});

export type profileFormValues = z.infer<typeof profileFormSchema>;

interface ProfileFormProps {
  onSubmit: (values: profileFormValues) => void;
  onCancel: () => void;
}

export function ProfileForm({ onSubmit, onCancel }: ProfileFormProps) {
  const { playerName, teamName } = useProfileStore();

  const form = useForm<profileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      playerName: playerName ?? "",
      teamName: teamName ?? "",
    },
  });

  const formDescription =
    "Enter player and team name to track your team's weekly tournament stats.";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>{formDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-y-6"
          >
            <div className="flex flex-col gap-y-3">
              <FormField
                control={form.control}
                name="playerName"
                render={({ field }) => (
                  <FormControl>
                    <Input placeholder="Player Name" {...field} />
                  </FormControl>
                )}
              />
              <FormField
                control={form.control}
                name="teamName"
                render={({ field }) => (
                  <FormControl>
                    <Input placeholder="Team Name" {...field} />
                  </FormControl>
                )}
              />
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => onCancel()}>
                Cancel
              </Button>
              <Button type="submit">Track</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
