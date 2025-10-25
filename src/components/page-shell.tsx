import Topbar from "./topbar";

export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex flex-col">
      <Topbar />
      <main className="p-6">{children}</main>
    </div>
  );
}
