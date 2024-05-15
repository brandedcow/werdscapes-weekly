"use client";

import { scanScreenshot } from "@/actions/scanScreenshot";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUploadFormStore } from "@/data/useUploadFormStore";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageUp } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ocrFormSchema = z.object({
  screenshots: typeof window === "undefined" ? z.any() : z.instanceof(FileList),
});

export type ocrFormValues = z.infer<typeof ocrFormSchema>;

export function OCRForm() {
  const { setData } = useUploadFormStore();

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
      setData(data);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-y-2"
      >
        <div className="flex  items-end">
          <FormField
            control={form.control}
            name="screenshots"
            render={({ field: { onChange, value, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>Screenshots</FormLabel>
                <FormControl>
                  <Input
                    {...fieldProps}
                    type="file"
                    multiple
                    onChange={(event) => onChange(event.target.files)}
                    className="rounded-tr-none rounded-br-none"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="flex gap-x-1 items-center rounded-tl-none rounded-bl-none"
          >
            <ImageUp
              height={14}
              width={14}
              className={cn(form.formState.isSubmitting && "animate-spin")}
            />
            Scan Screenshots
          </Button>
        </div>
      </form>
    </Form>
  );
}
