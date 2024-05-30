"use client";

import updateTeamTournamentScores from "@/actions/updateTeamTournamentScores";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { cn, zodInputStringPipe } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ListPlus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

const editTeamTournamentScoresSchema = z.object({
  scores: z.array(
    z.object({
      playerId: z.string(),
      name: z.string().min(1),
      score: zodInputStringPipe(z.coerce.number().nonnegative()),
    })
  ),
});

export type editTeamTournamentScoresFormValues = z.infer<
  typeof editTeamTournamentScoresSchema
>;

interface EditTeamTournamentScoresFormProps {
  tournamentId: string;
  teamId: string;
  defaultValues: editTeamTournamentScoresFormValues;
}

export function EditTeamTournamentScoresForm({
  tournamentId,
  teamId,
  defaultValues,
}: EditTeamTournamentScoresFormProps) {
  const form = useForm({
    resolver: zodResolver(editTeamTournamentScoresSchema),
    defaultValues,
  });
  const [playerName, setPlayerName] = useState("");
  const [playerScore, setPlayerScore] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const { fields, prepend, replace, remove } = useFieldArray<any>({
    control: form.control,
    name: "scores",
  });

  const handleSortScoreFields = () => {
    const { scores } = form.getValues();
    const sortedScores = scores.toSorted((a, b) =>
      parseInt(a.score) - parseInt(b.score) > 0 ? -1 : 1
    );
    replace(sortedScores);
  };

  const handleSubmit = async (values: editTeamTournamentScoresFormValues) => {
    console.log("submit");
    const { success, data } = await updateTeamTournamentScores({
      tournamentId,
      teamId,
      ...values,
    });

    if (success) {
      toast({
        title: "Update Success",
        description: data,
      });
      router.push(`/team-tournament/${tournamentId}`);
    } else {
      toast({
        title: "Update Failed",
        description: data,
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-y-2"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name="scores"
          render={() => (
            <FormItem>
              <div className="flex items-center gap-x-2">
                <div className="flex flex-1 flex-col space-y-2">
                  <Label>Player Name</Label>
                  <Input
                    name="playerName"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                  />
                </div>
                <div className="flex flex-1 flex-col space-y-2">
                  <Label>Score</Label>
                  <Input
                    name="playerScore"
                    value={playerScore}
                    onChange={(e) => setPlayerScore(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleSortScoreFields}
                  className="flex-1"
                >
                  Sort Scores
                </Button>
                <Button
                  variant="secondary"
                  type="button"
                  onClick={() =>
                    prepend({
                      playerId: "",
                      name: playerName,
                      score: playerScore,
                    })
                  }
                  className="flex-1"
                >
                  <ListPlus height={18} width={18} className="mr-1" />
                  Add Score
                </Button>
              </div>

              {fields.map((field, index) => (
                <div key={field.id} className="flex flex-col">
                  <div className="flex gap-x-2 items-center">
                    <FormLabel htmlFor={`scores.${index}.name`}>
                      {index + 1}.
                    </FormLabel>
                    <FormField
                      control={form.control}
                      name={`scores.${index}.name`}
                      render={({
                        field: formfield,
                        fieldState: formfieldstate,
                      }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="Rock" {...formfield} />
                          </FormControl>
                          <FormMessage>
                            {formfieldstate.error?.message}
                          </FormMessage>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`scores.${index}.score`}
                      render={({
                        field: formfield,
                        fieldState: formfieldstate,
                      }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="0" {...formfield} />
                          </FormControl>
                          <FormMessage>
                            {formfieldstate.error?.message}
                          </FormMessage>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`scores.${index}.playerId`}
                      render={({ field: formfield }) => (
                        <FormItem>
                          <FormControl>
                            <Input type="hidden" {...formfield} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      type="button"
                      onClick={() => remove(index)}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                  {index !== fields.length - 1 && (index + 1) % 6 === 0 && (
                    <Separator className="mt-2 bg-muted-foreground" />
                  )}
                </div>
              ))}
            </FormItem>
          )}
        />
        <div className="flex flex-row gap-x-2">
          <Button
            variant="outline"
            type="reset"
            onClick={() => form.reset()}
            className="flex-1"
          >
            Reset Scores
          </Button>
          <Button
            className="flex-1"
            variant="destructive"
            type="reset"
            onClick={() => replace([])}
          >
            Clear Scores
          </Button>
        </div>
        <Button
          type="submit"
          className={cn(form.formState.isSubmitting && "animate-spin")}
          disabled={form.formState.isSubmitting}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
