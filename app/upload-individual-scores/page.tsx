import { ScanScreenshotsCard } from "@/components/shared/scan-screenshots-card";
import { UploadScreenshotCard } from "@/components/shared/upload-scores-card";
import { CardTitle } from "@/components/ui/card";
import { SelectPlayerCard } from "@/components/shared/select-player-card";

export default function UploadIndividualScores() {
  // TODO: Adjust Scan and Upload components for indie tournaments
  return (
    <div className="flex flex-col gap-y-4">
      <CardTitle>Upload Individual Tournament Scores</CardTitle>
      <SelectPlayerCard />
      <ScanScreenshotsCard />
      <UploadScreenshotCard />
    </div>
  );
}
