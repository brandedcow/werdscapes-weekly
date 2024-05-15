import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OCRForm } from "./ocr-form";
import UploadForm from "./upload-form";

export function UploadScreenshotCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Screenshots</CardTitle>
        <CardDescription>
          PeopleFun does not offer a public API to access tournament info.
          Upload screenshots to scan data. You may need to adjust incorrectly
          scanned data.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-6">
        <OCRForm />
        <UploadForm />
      </CardContent>
    </Card>
  );
}
