import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import { TeamCard } from "@/components/shared/team-card/container";

export default async function TeamPage({ params }: { params: { id: string } }) {
  return (
    <>
      <PageBreadcrumb />
      <TeamCard id={params.id} />
    </>
  );
}
