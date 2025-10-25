import { SidebarTrigger } from "./ui/sidebar";
import { ModeToggle } from "./mode-toggle";

export default function Topbar() {
  return (
    <div className="border-b px-4 h-14 flex items-center justify-between sticky top-0 bg-background z-10">
      <SidebarTrigger />
      <ModeToggle />
    </div>
  );
}
