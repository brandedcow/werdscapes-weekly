"use client";

import { uploadTeamTournamentScores } from "@/actions/uploadTeamTournamentScores";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { useUploadFormStore } from "@/data/useUploadFormStore";
import { ParseOCRTokenResult } from "@/lib/parseOCRTokens";
import { cn, zodInputStringPipe } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { previousFriday, startOfDay } from "date-fns";
import { CalendarIcon, ListPlus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { SelectedInfo } from "../selected-info";
import getTeamMembersByTeamId from "@/data/by-team-id/getTeamMembersByTeamId";

const uploadTeamScoresFormSchema = z.object({
  team: z.object({
    id: z.string().min(1),
    name: z.string().min(1),
  }),
  week: z.date(),
  place: zodInputStringPipe(z.coerce.number().positive()),
  scores: z
    .array(
      z.object({
        playerId: z.string(),
        name: z.string().min(1),
        score: zodInputStringPipe(z.coerce.number().nonnegative()),
      })
    )
    .min(1),
});

export type uploadTeamScoresFormValues = z.infer<
  typeof uploadTeamScoresFormSchema
>;

export default function UploadTeamTournamentScoresForm() {
  const { data, place, clear, team, setData } = useUploadFormStore();
  const { toast } = useToast();
  const router = useRouter();
  const [playerName, setPlayerName] = useState("");
  const [playerScore, setPlayerScore] = useState("");

  const form = useForm<uploadTeamScoresFormValues>({
    resolver: zodResolver(uploadTeamScoresFormSchema),
    defaultValues: {
      team: team ?? {},
      week: startOfDay(previousFriday(new Date())),
      place: 0,
      scores: [],
    },
  });

  const { fields, append, remove, replace, prepend } = useFieldArray<any>({
    name: "scores",
    control: form.control,
  });

  const handleSubmit = async (values: any) => {
    const { success, data, error } = await uploadTeamTournamentScores(values);
    if (success && data) {
      resetFormAndStore();
      toast({
        title: "Upload Success",
        description: data,
      });
      router.back();
    } else {
      console.error("error in the upload form");
      toast({
        title: "Upload Error",
        description: error,
        variant: "destructive",
      });
    }
  };

  const handleSortScoreFields = () => {
    const { scores } = form.getValues();
    const sortedScores = scores.toSorted((a, b) =>
      parseInt(a.score) - parseInt(b.score) > 0 ? -1 : 1
    );
    replace(sortedScores);
    setData(
      sortedScores.reduce<ParseOCRTokenResult>((acc, curr) => {
        const { name, score } = curr;
        acc[name] = score;
        return acc;
      }, {})
    );
  };

  const resetFormAndStore = () => {
    form.reset();
    clear();
  };

  useEffect(() => {
    const fetchTeamMembers = async () => {
      if (!team) return;

      const { success, data: teamMembers } = await getTeamMembersByTeamId(
        team.id
      );

      if (!success || !teamMembers) return;

      const existingScores = form.getValues().scores;

      replace(
        existingScores.map((exScore) => {
          let { name, playerId, score } = exScore;

          const foundIndex = teamMembers.findIndex(
            (player) => player.name === name
          );

          if (foundIndex !== -1) {
            playerId = teamMembers[foundIndex].id;
            teamMembers.splice(foundIndex, 1);
          }

          return {
            name,
            playerId,
            score,
          };
        })
      );
    };

    if (data && Object.keys(data).length !== form.getValues().scores.length) {
      replace(
        Object.entries(data).map(([name, score]) => ({
          playerId: "",
          name,
          score,
        }))
      );
    }

    if (team) {
      form.setValue("team", team);
      fetchTeamMembers();
    }

    form.setValue("place", place);
  }, [place, data, append, form, team, replace]);

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-y-4"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name="week"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>WeeK</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className="flex items-center gap-x-1 justify-start"
                    >
                      <CalendarIcon height={15} width={15} />
                      {field.value.toLocaleDateString()}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={[
                      (date) =>
                        date > new Date() || date < new Date("1900-01-01"),
                      { dayOfWeek: [0, 1, 2, 3, 4, 6] },
                    ]}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="place"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Place</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="scores"
          render={({ fieldState }) => (
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
              <FormMessage>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />
        <Button
          variant="destructive"
          type="reset"
          onClick={() => resetFormAndStore()}
        >
          Clear Scores
        </Button>
        <Card
          className={cn(
            "p-4 space-y-2 bg-secondary text-secondary-foreground",
            form.formState.errors.team?.message && "border border-destructive"
          )}
        >
          <Label
            className={cn(
              form.formState.errors.team?.message && "text-destructive"
            )}
          >
            Selected Team
          </Label>
          <SelectedInfo item={team} />
        </Card>
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
