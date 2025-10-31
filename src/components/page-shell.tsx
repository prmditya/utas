import Topbar from "./topbar";

export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full">
      <Topbar />
      {children}
    </div>
  );
}
