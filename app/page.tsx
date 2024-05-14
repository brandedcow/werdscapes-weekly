import { PageHeader } from "@/components/shared/page-header";
import { ProfileCard } from "@/components/shared/profile-card";
import { TeamHistoryCard } from "@/components/shared/team-history-card";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-start p-12 gap-y-5">
      <PageHeader />
      <ProfileCard />
      <TeamHistoryCard />
    </main>
  );
}
