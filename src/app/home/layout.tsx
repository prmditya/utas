import { AppSidebar } from "@/components/app-sidebar";
import PageShell from "@/components/page-shell";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppSidebar />
      <PageShell>{children}</PageShell>
    </>
  );
}
