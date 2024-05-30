"use client";

import { updateTeamTournamentInfo } from "@/actions/updateTeamTournamentInfo";
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
import { zodInputStringPipe } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const editTeamTournamentInfoSchema = z.object({
  week: z.date(),
  place: zodInputStringPipe(z.coerce.number().positive()),
});

export type editTeamTournamentInfoFormValues = z.infer<
  typeof editTeamTournamentInfoSchema
>;

interface EditTeamTournamentInfoFormProps {
  id: string;
  defaultValues: editTeamTournamentInfoFormValues;
}

export function EditTeamTournamentInfoForm({
  id,
  defaultValues,
}: EditTeamTournamentInfoFormProps) {
  const form = useForm({
    resolver: zodResolver(editTeamTournamentInfoSchema),
    defaultValues,
  });
  const { toast } = useToast();

  const handleSubmit = async (values: editTeamTournamentInfoFormValues) => {
    const { success, data } = await updateTeamTournamentInfo({ id, ...values });

    if (success) {
      toast({
        title: "Update Success",
        description: data,
      });
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
      <form className="space-y-2" onSubmit={form.handleSubmit(handleSubmit)}>
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
        <div className="pt-4 flex justify-between items-center">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit">Update</Button>
        </div>
      </form>
    </Form>
  );
}
