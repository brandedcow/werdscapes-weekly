"use client";

import { updateTournament } from "@/actions/updateTournament";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, ListPlus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

const editTournamentFormSchema = z.object({
  teamName: z.string(),
  week: z.date(),
  scores: z.array(
    z.object({
      playerName: z.string(),
      score: z.string(),
      id: z.string(),
    })
  ),
});

export type editTournamentFormValues = z.infer<typeof editTournamentFormSchema>;

interface EditTournamentFormProps {
  id: string;
  defaultValues: editTournamentFormValues;
}

export function EditTournamentForm({
  id,
  defaultValues,
}: EditTournamentFormProps) {
  const form = useForm<editTournamentFormValues>({
    resolver: zodResolver(editTournamentFormSchema),
    defaultValues,
  });
  const { toast } = useToast();
  const router = useRouter();

  const { fields, append, remove } = useFieldArray({
    name: "scores",
    control: form.control,
  });

  const handleSubmit = async (values: editTournamentFormValues) => {
    console.log("submit");
    const { success, data } = await updateTournament({ id, ...values });

    if (success && data) {
      form.reset();
      toast({
        title: "Success",
        description: data,
      });

      router.push(`/dashboard/team-tournament/${id}`);
    }
  };

  useEffect(() => {
    console.log(form.formState.errors);
  }, [form.formState.errors]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-y-2"
      >
        <FormField
          control={form.control}
          name="teamName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team Name</FormLabel>
              <FormControl>
                <Input placeholder="Bridge Four" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="week"
          render={({ field }) => (
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
            </FormItem>
          )}
        />
        <div>
          <FormLabel>Scores</FormLabel>
          <div className="flex flex-col mt-2 gap-y-2">
            {fields.map((field, index) => (
              <div key={field.id} className="flex flex-col">
                <div key={field.id} className="flex gap-x-2 items-center">
                  <FormLabel htmlFor={`scores.${index}.name`}>
                    {index + 1}.
                  </FormLabel>
                  <FormField
                    control={form.control}
                    name={`scores.${index}.playerName`}
                    render={({ field: formfield }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Rock" {...formfield} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`scores.${index}.score`}
                    render={({ field: formfield, fieldState }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="number" placeholder="0" {...formfield} />
                        </FormControl>
                        <FormMessage>{fieldState.error?.message}</FormMessage>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`scores.${index}.id`}
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
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-y-6 mt-4">
          <div className="flex justify-between">
            <Button
              variant="secondary"
              type="button"
              onClick={() => append({ playerName: "", score: "", id: "" })}
            >
              <ListPlus height={18} width={18} className="mr-1" />
              Add Score
            </Button>
            <Button
              variant="destructive"
              type="button"
              onClick={() => form.reset()}
            >
              <ListPlus height={18} width={18} className="mr-1" />
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
        </div>
      </form>
    </Form>
  );
}
