import { SelectTeamCard } from "@/components/shared/select-team-card";
import { ScanScreenshotsCard } from "@/components/shared/scan-screenshots-card";
import { UploadScreenshotCard } from "@/components/shared/upload-scores-card";
import { CardTitle } from "@/components/ui/card";

export default function UploadTeamScoresPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <CardTitle>Upload Team Tournament Scores</CardTitle>
      <SelectTeamCard />
      <ScanScreenshotsCard />
      <UploadScreenshotCard />
    </div>
  );
}
