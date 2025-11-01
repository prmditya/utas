"use client";
import { Home, Search, Settings, LogOut } from "lucide-react";
import Image from "next/image";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { NavUser } from "./nav-user";
import { signOut, useSession } from "next-auth/react";
import { ModeToggle } from "./mode-toggle";

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
];

const other = [
  {
    title: "Settings",
    url: "/home",
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
            <SidebarGroupLabel>Main</SidebarGroupLabel>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="my-1">
                  <SidebarMenuButton>
                    <a
                      href={item.url}
                      className="flex items-center gap-2 text-md"
                    >
                      <item.icon className="size-4" /> {/* icon size */}
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
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarGroupLabel>Other</SidebarGroupLabel>
            {other.map((item) => (
              <SidebarMenuItem key={item.title} className="my-1">
                <SidebarMenuButton>
                  <a
                    href={item.url}
                    className="flex items-center gap-2 text-md "
                  >
                    <item.icon className="size-4" /> {/* icon size */}
                    <span className="text-base font-medium">{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}

            <SidebarMenuItem className="my-1">
              <SidebarMenuButton>
                <ModeToggle />
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem className="my-1">
              <SidebarMenuButton>
                <div
                  className="flex items-center gap-2 text-md text-red-400 w-full"
                  onClick={() => signOut()}
                >
                  <LogOut className="size-4" />
                  <span className="text-base font-medium">Log Out</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
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
