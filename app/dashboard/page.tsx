import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import { PageHeader } from "@/components/shared/page-header";
import { ProfileCard } from "@/components/shared/profile-card";
import { TeamHistoryCard } from "@/components/shared/team-history-card/container";

export default function Dashboard() {
  return (
    <>
      <PageBreadcrumb />
      <ProfileCard />
      <TeamHistoryCard />
    </>
  );
}
