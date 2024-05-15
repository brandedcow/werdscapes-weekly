import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import { ProfileCard } from "@/components/shared/profile-card/container";
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
