"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { trackEvent } from "@/lib/analytics";

const navLinks = [
  { href: "/puzzles", label: "Puzzles" },
  { href: "/quizzes", label: "Quizzes" },
  { href: "/daily", label: "Daily" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/invite", label: "Invite" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-soft">
            <Sparkles className="h-5 w-5" />
          </span>
          <span className="text-base tracking-tight">BitPoet Puzzles</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              trackEvent("login_start");
              toast({
                title: "Login coming soon",
                description: "Anonymous play is active. Login will enable streaks.",
              });
            }}
          >
            Log in
          </Button>
          <Button size="sm" asChild>
            <Link href="/daily">Play now</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
