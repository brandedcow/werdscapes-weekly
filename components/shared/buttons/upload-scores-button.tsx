import { Button } from "@/components/ui/button";
import Link from "next/link";

export function UploadScoresButton() {
  return (
    <Button>
      <Link href="/upload-team-scores">Upload Scores</Link>
    </Button>
  );
}
