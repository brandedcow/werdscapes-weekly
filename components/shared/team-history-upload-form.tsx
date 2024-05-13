import { Calendar, PlusSquare } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const teamHistoryFormSchema = z.object({
  date: z.date(),
  screenshots: z.array(z.string()),
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
  const form = useForm<teamHistoryFormValues>({
    defaultValues: {
      date: new Date(),
      screenshots: [],
    },
  });

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
                            <Calendar height={15} width={15} />
                            {field.value.toLocaleDateString()}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent></PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="screenshots"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Screenshots</FormLabel>
                    <FormControl>
                      <Input id="screenshots" type="file" multiple {...field} />
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
