import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import { PlayerCard } from "@/components/shared/player-card";

export default function PlayerDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <>
      <PageBreadcrumb />
      <PlayerCard id={params.id} />
    </>
  );
}
