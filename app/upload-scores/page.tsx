import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import { ScanScreenshotsCard } from "@/components/shared/scan-screenshots-card/container";
import { UploadScreenshotCard } from "@/components/shared/upload-screenshot-card/container";
import { CardTitle } from "@/components/ui/card";

export default function UploadScreenshotsPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <CardTitle>Upload Scores</CardTitle>
      <ScanScreenshotsCard />
      <UploadScreenshotCard />
    </div>
  );
}
