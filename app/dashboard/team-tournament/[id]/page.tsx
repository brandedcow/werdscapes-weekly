import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
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
