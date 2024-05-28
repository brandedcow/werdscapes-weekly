import { EditTournamentCard } from "@/components/shared/edit-tournament-card/container";
import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";

export default function EditTournamentPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <>
      <PageBreadcrumb />
      <EditTournamentCard id={params.id} />
    </>
  );
}
