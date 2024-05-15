import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import { ProfileCard } from "@/components/shared/profile-card/container";
import TournamentCard from "@/components/shared/tournament-card";

export default function TournamentDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <>
      <PageBreadcrumb />
      <TournamentCard id={params.id} />
    </>
  );
}
