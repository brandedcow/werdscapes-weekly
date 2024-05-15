import { PageHeader } from "@/components/shared/page-header";
import { PropsWithChildren } from "react";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex min-h-screen flex-col justify-start p-12 gap-y-5">
      <PageHeader />
      {children}
    </main>
  );
}
