"use client";

import createPlayer from "@/actions/createPlayer";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useUploadFormStore } from "@/data/useUploadFormStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const createPlayerFormSchema = z.object({
  name: z.string().min(1),
});

export type createPlayerFormValues = z.infer<typeof createPlayerFormSchema>;

export function CreatePlayerForm() {
  const { setPlayer } = useUploadFormStore();
  const form = useForm({
    resolver: zodResolver(createPlayerFormSchema),
    defaultValues: {
      name: "",
    },
  });
  const { toast } = useToast();

  const handleSubmit = async (values: createPlayerFormValues) => {
    const { success, data } = await createPlayer(values);

    if (!success || !data) {
      toast({
        variant: "destructive",
        title: "Create Player Failed",
      });
    } else {
      toast({
        title: "Create Player Success",
        description: `Player ${data.name} created.`,
      });
      setPlayer(data);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Player Name</FormLabel>
              <FormControl>
                <Input placeholder="Kaladin" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="w-full">Create Player</Button>
      </form>
    </Form>
  );
}
