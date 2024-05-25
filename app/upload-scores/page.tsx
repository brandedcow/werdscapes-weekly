import { SelectTeamCard } from "@/components/shared/select-team-card";
import { ScanScreenshotsCard } from "@/components/shared/scan-screenshots-card";
import { UploadScreenshotCard } from "@/components/shared/upload-scores-card/container";
import { CardTitle } from "@/components/ui/card";

export default function UploadScreenshotsPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <CardTitle>Upload Scores</CardTitle>
      <SelectTeamCard />
      <ScanScreenshotsCard />
      <UploadScreenshotCard />
    </div>
  );
}
