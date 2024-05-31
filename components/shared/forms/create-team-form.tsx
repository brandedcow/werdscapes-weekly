"use client";

import createTeam from "@/actions/createTeam";
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

const createTeamFormSchema = z.object({
  name: z.string().min(1),
});

export type createTeamFormValues = z.infer<typeof createTeamFormSchema>;

export function CreateTeamForm() {
  const form = useForm({
    resolver: zodResolver(createTeamFormSchema),
    defaultValues: {
      name: "",
    },
  });
  const { toast } = useToast();
  const { setTeam } = useUploadFormStore();

  const handleSubmit = async (values: createTeamFormValues) => {
    const { success, data } = await createTeam(values);

    if (!success || !data) {
      toast({
        variant: "destructive",
        title: "Create Team Failed",
      });
    } else {
      toast({
        title: "Create Team Success",
        description: `Team ${data.name} created.`,
      });
      setTeam(data);
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
              <FormLabel>Team Name</FormLabel>
              <FormControl>
                <Input placeholder="Bridge Four" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="w-full">Create Team</Button>
      </form>
    </Form>
  );
}
