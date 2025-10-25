import { SidebarTrigger } from "./ui/sidebar";

export default function Topbar() {
  return (
    <div className="border-b px-4 h-14 flex items-center">
      <SidebarTrigger />
    </div>
  );
}
