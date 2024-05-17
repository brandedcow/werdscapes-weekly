import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OCRForm } from "./ocr-form";
import UploadForm from "./upload-scores-form";
import { Separator } from "@/components/ui/separator";

export function UploadScreenshotCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Scores</CardTitle>
        <CardDescription>
          PeopleFun does not offer a public API to access tournament info.
          Upload screenshots to scan data. You may need to adjust incorrectly
          scanned scores. Be patient with the upload process, can take up to a
          minute.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-6">
        <OCRForm />
        <Separator />
        <UploadForm />
      </CardContent>
    </Card>
  );
}
