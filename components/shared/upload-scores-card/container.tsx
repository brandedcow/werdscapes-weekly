import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UploadForm from "./upload-scores-form";

export function UploadScreenshotCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Adjust Scores</CardTitle>
      </CardHeader>
      <CardContent>
        <UploadForm />
      </CardContent>
    </Card>
  );
}
