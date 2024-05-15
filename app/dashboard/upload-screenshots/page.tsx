import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import { ProfileCard } from "@/components/shared/profile-card";
import { UploadScreenshotCard } from "@/components/shared/upload-screenshot-card/container";

export default function UploadScreenshotsPage() {
  return (
    <>
      <PageBreadcrumb />
      <ProfileCard />
      <UploadScreenshotCard />
    </>
  );
}
