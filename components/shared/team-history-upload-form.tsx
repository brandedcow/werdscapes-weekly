"use client";

import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { previousFriday } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import useProfileStore from "@/store/useProfileStore";
import { useEffect } from "react";

const teamHistoryFormSchema = z.object({
  teamName: z.string(),
  date: z.date(),
  screenshots: typeof window === "undefined" ? z.any() : z.instanceof(FileList),
});

export type teamHistoryFormValues = z.infer<typeof teamHistoryFormSchema>;

interface TeamHistoryUploadFormProps {
  onSubmit: (values: any) => void;
  onCancel: () => void;
}

export function TeamHistoryUploadForm({
  onSubmit,
  onCancel,
}: TeamHistoryUploadFormProps) {
  const { teamName } = useProfileStore();

  const form = useForm({
    resolver: zodResolver(teamHistoryFormSchema),
    defaultValues: {
      teamName,
      date: previousFriday(new Date()),
    },
  });

  useEffect(() => {
    if (teamName) {
      form.setValue("teamName", teamName);
    }
  }, [teamName, form]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>History</CardTitle>
        <CardDescription>
          PeopleFun does not offer a public API to access tournament info.
          Upload screenshots to add data.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-y-6"
          >
            <div className="flex flex-col gap-y-2">
              <FormField
                control={form.control}
                name="teamName"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Team Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className="w-full flex items-center gap-x-1 justify-start"
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
                              date > new Date() ||
                              date < new Date("1900-01-01"),
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
                name="screenshots"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>Screenshots</FormLabel>
                    <FormControl>
                      <Input
                        {...fieldProps}
                        type="file"
                        multiple
                        onChange={(event) => onChange(event.target.files)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => onCancel()}>
                Cancel
              </Button>
              <Button type="submit">Upload</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
