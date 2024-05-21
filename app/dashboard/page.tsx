import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import { TeamTournamentHistoryCard } from "@/components/shared/team-tournament-history-card/container";

export default function Dashboard() {
  return (
    <>
      <PageBreadcrumb />
      <TeamTournamentHistoryCard />
    </>
  );
}
