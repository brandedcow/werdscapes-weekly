"use client";

import { uploadScores } from "@/actions/uploadScores";
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
import useProfileStore from "@/data/useProfileStore";
import { useUploadFormStore } from "@/data/useUploadFormStore";
import { cn, zodInputStringPipe } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { previousFriday } from "date-fns";
import { CalendarIcon, ListPlus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

const uploadScoresFormSchema = z.object({
  teamName: z.string().min(1),
  week: z.date(),
  place: zodInputStringPipe(z.coerce.number().positive()),
  scores: z
    .array(
      z.object({
        name: z.string(),
        score: z.string(),
      })
    )
    .min(1),
});

export type uploadScoresFormValues = z.infer<typeof uploadScoresFormSchema>;

export default function UploadScoresForm() {
  const { data, place, clear } = useUploadFormStore();
  const { teamName } = useProfileStore();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<uploadScoresFormValues>({
    resolver: zodResolver(uploadScoresFormSchema),
    defaultValues: {
      teamName: teamName ?? "",
      week: previousFriday(new Date()),
      place: 0,
      scores: [],
    },
  });

  const { fields, append, remove } = useFieldArray<any>({
    name: "scores",
    control: form.control,
  });

  const handleSubmit = async (values: any) => {
    const { success, data } = await uploadScores(values);

    if (success && data) {
      resetFormAndStore();

      toast({
        title: "Upload Successful",
        description: data,
      });

      router.push("/dashboard");
    } else {
      console.error("error in the upload form");
      // TODO: test error
    }
  };

  const resetFormAndStore = () => {
    form.reset();
    clear();
  };

  useEffect(() => {
    // set up dynamic form when data changes
    for (const [name, score] of Object.entries(data)) {
      append({ name, score });
    }
    form.setValue("place", place);
  }, [place, data, append, form]);

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-y-6"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name="teamName"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Team Name</FormLabel>
              <FormControl>
                <Input placeholder="Bridge Four" {...field} />
              </FormControl>
              <FormMessage>{fieldState.error?.message}</FormMessage>
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
        <>
          <FormField
            control={form.control}
            name="scores"
            render={({ fieldState }) => (
              <FormItem>
                <FormLabel>Scores</FormLabel>
                {fields.map((field, index) => (
                  <div key={field.id} className="flex flex-col">
                    <div className="flex gap-x-2 items-center">
                      <FormLabel htmlFor={`scores.${index}.name`}>
                        {index + 1}.
                      </FormLabel>
                      <FormField
                        control={form.control}
                        name={`scores.${index}.name`}
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
                        render={({ field: formfield }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="0" {...formfield} />
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
                <FormMessage>{fieldState.error?.message}</FormMessage>
              </FormItem>
            )}
          />
        </>
        <div className="flex justify-between">
          <Button
            variant="secondary"
            type="button"
            onClick={() => append({ name: "", score: "" })}
          >
            <ListPlus height={18} width={18} className="mr-1" />
            Add Score
          </Button>
          <Button
            variant="destructive"
            type="button"
            onClick={() => resetFormAndStore()}
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
      </form>
    </Form>
  );
}
