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
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { cn, zodInputStringPipe } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const editTournamentFormSchema = z.object({
  teamName: z.string().min(1),
  week: z.date(),
  place: zodInputStringPipe(z.coerce.number().positive()),
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

  const handleSubmit = async (values: editTournamentFormValues) => {
    const { success, data, error } = await updateTournament({
      id,
      ...values,
    });

    if (success && data) {
      form.reset();
      toast({
        title: "Success",
        description: data,
      });
      router.push(`/dashboard/team-tournament/${id}`);
    } else {
      toast({
        title: "Uh Oh..",
        description: error,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-y-2"
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
          <div className="flex justify-between flex-wrap">
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
          </div>
          <div className="flex flex-row justify-between mt-4">
            <Button
              variant="outline"
              type="button"
              onClick={() => form.reset()}
            >
              Reset Values
            </Button>
            <Button
              type="submit"
              className={cn(form.formState.isSubmitting && "animate-spin")}
              disabled={form.formState.isSubmitting}
            >
              Update Tournament Info
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
