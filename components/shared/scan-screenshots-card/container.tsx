import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OCRForm } from "./ocr-form";

export function ScanScreenshotsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Scan Screenshots</CardTitle>
        <CardDescription>
          Screenshots scan is powered by the free OCR space API. You may need to
          adjust incorrectly scanned scores. The API can take up to a minute to
          respond.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <OCRForm />
      </CardContent>
    </Card>
  );
}
