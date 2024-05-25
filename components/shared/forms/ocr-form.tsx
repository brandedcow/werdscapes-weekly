"use client";

import { scanScreenshot } from "@/actions/scanScreenshot";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useUploadFormStore } from "@/data/useUploadFormStore";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageUp } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ocrFormSchema = z.object({
  screenshots:
    typeof window === "undefined"
      ? z.any()
      : z.instanceof(FileList, { message: "Upload at least 1 file" }),
});

export type ocrFormValues = z.infer<typeof ocrFormSchema>;

export function OCRForm() {
  const { setData, setPlace } = useUploadFormStore();
  const { toast } = useToast();

  const form = useForm<ocrFormValues>({
    resolver: zodResolver(ocrFormSchema),
  });

  const handleSubmit = async (values: ocrFormValues) => {
    const formData = new FormData();
    for (const screenshot of values.screenshots) {
      formData.append("screenshots", screenshot);
    }
    const { data, success } = await scanScreenshot(formData);

    if (success && data) {
      const { scoreboard, place } = data;
      if (scoreboard) setData(scoreboard);
      if (place) setPlace(place);

      toast({
        title: "OCR Success",
        description: `Scanned ${Object.keys(scoreboard).length} scores.`,
      });
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
          name="screenshots"
          render={({
            field: { onChange, value, ...fieldProps },
            fieldState,
          }) => (
            <FormItem>
              <FormLabel>Select Screenshots</FormLabel>
              <div className="flex">
                <FormControl>
                  <Input
                    {...fieldProps}
                    type="file"
                    multiple
                    onChange={(event) => onChange(event.target.files)}
                  />
                </FormControl>
              </div>
              <FormMessage>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="flex gap-x-1 items-center"
          disabled={form.formState.isSubmitting}
        >
          <ImageUp
            height={14}
            width={14}
            className={cn(form.formState.isSubmitting && "animate-spin")}
          />
          Scan with OCR space
        </Button>
      </form>
    </Form>
  );
}
