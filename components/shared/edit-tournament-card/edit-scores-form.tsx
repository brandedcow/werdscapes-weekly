"use client";

import { updateScores } from "@/actions/updateScores";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { cn, zodInputStringPipe } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

interface EditScoresFormProps {
  tournamentId: string;
  teamId: string;
  defaultValues: editScoresFormValues;
}

const editScoresFormSchema = z.object({
  scores: z
    .array(
      z.object({
        playerName: z.string().min(1),
        score: zodInputStringPipe(z.coerce.number().nonnegative()),
        id: z.string(),
      })
    )
    .min(1),
});

export type editScoresFormValues = z.infer<typeof editScoresFormSchema>;

export function EditScoresForm({
  tournamentId,
  teamId,
  defaultValues,
}: EditScoresFormProps) {
  const form = useForm({
    resolver: zodResolver(editScoresFormSchema),
    defaultValues,
  });
  const { toast } = useToast();
  const router = useRouter();

  const { fields, append, remove, replace } = useFieldArray({
    name: "scores",
    control: form.control,
  });

  const handleSortScoreFields = () => {
    const { scores } = form.getValues();
    const sortedScores = scores.toSorted((a, b) =>
      parseInt(a.score) - parseInt(b.score) > 0 ? -1 : 1
    );
    replace(sortedScores);
  };

  const handleSubmit = async (values: editScoresFormValues) => {
    const { success, data, error } = await updateScores({
      tournamentId,
      teamId,
      ...values,
    });

    if (success && data) {
      toast({
        title: "Update Success",
        description: data,
      });
      router.push(`/dashboard/team-tournament/${tournamentId}`);
    } else {
      toast({
        variant: "destructive",
        title: "Update Error",
        description: error,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="scores"
          render={() => (
            <FormItem>
              <FormLabel>Scores</FormLabel>
              <div className="flex flex-col gap-y-2">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex gap-x-2 items-center">
                    <FormLabel htmlFor={`scores.${index}.name`}>
                      {index + 1}.
                    </FormLabel>
                    <FormField
                      control={form.control}
                      name={`scores.${index}.playerName`}
                      render={({ field: formfield }) => (
                        <FormItem>
                          <Input {...formfield} />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`scores.${index}.score`}
                      render={({ field: formfield }) => (
                        <FormItem>
                          <Input {...formfield} />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`scores.${index}.id`}
                      render={({ field: formfield }) => (
                        <FormItem>
                          <Input type="hidden" {...field} />
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
                ))}
              </div>
            </FormItem>
          )}
        />
        <div className="flex mt-6 justify-between">
          <Button
            variant="secondary"
            type="button"
            onClick={() => append({ playerName: "", score: "0", id: "" })}
          >
            Add Score
          </Button>

          <Button variant="outline" type="button" onClick={() => form.reset()}>
            Reset Scores
          </Button>
          <Button
            variant="outline"
            type="button"
            onClick={handleSortScoreFields}
          >
            Sort Scores
          </Button>
          <Button
            type="submit"
            className={cn(form.formState.isSubmitting && "animate-spin")}
            disabled={form.formState.isSubmitting}
          >
            Update Scores
          </Button>
        </div>
      </form>
    </Form>
  );
}
