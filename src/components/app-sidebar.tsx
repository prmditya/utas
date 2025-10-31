"use client";
import { Home, Search, Settings } from "lucide-react";
import Image from "next/image";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { NavUser } from "./nav-user";
import { useSession } from "next-auth/react";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  return (
    <Sidebar className="z-30">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/home" className="flex items-center gap-2">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Image
                    src="/assets/logo.webp"
                    alt="Utas Logo"
                    width={32}
                    height={32}
                  />
                </div>
                <div className="flex flex-col ">
                  <span className="font-bold text-2xl">utas</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="py-3">
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="my-1">
                  <SidebarMenuButton>
                    <a
                      href={item.url}
                      className="flex items-center gap-2 text-lg "
                    >
                      <item.icon className="w-6 h-6" /> {/* icon size */}
                      <span className="text-base font-medium">
                        {item.title}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: session.user?.name || "John Doe",
            email: session.user?.email || "john@example.com",
            avatar: "/path/to/avatar.jpg",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
