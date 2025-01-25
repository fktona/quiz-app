"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LayoutGrid, History, Trophy, LogOut, Menu } from "lucide-react";
import { logoutAction } from "@/app/actions";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Layout({ children }: { children: React.ReactNode }) {
  const handleLogout = async () => {
    try {
      await logoutAction();
      // The action will handle the redirection
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  const navItems = [
    { href: "/dashboard", icon: LayoutGrid, label: "Dashboard" },
    { href: "/history", icon: History, label: "Performance History" },
    { href: "/leaderboard", icon: Trophy, label: "Leaderboard" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container flex items-center justify-between h-16 px-4">
          <Link href="/" className="flex items-center">
            <Button variant="ghost" className="text-blue-500 font-semibold">
              Test It
            </Button>
          </Link>
          <nav className="hidden md:flex items-center gap-4">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Button>
              </Link>
            ))}
            <Button
              variant="ghost"
              size="sm"
              className="text-red-500"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </nav>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {navItems.map((item) => (
                <DropdownMenuItem key={item.href} asChild>
                  <Link href={item.href} className="flex items-center gap-2">
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem
                className="text-red-500"
                onSelect={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="container px-4 py-6">{children}</main>
    </div>
  );
}
