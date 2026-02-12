import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { GameRenderer } from "@/components/game/game-renderer";
import { DifficultyPill } from "@/components/difficulty-pill";
import { LeaderboardTable } from "@/components/leaderboard-table";
import { TimePill } from "@/components/time-pill";
import { Card } from "@/components/ui/card";
import { getPuzzleBySlug } from "@/lib/content";

export async function generateMetadata({
  params,
}: {
  params?: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await (params ?? Promise.resolve({ slug: "" }));
  const puzzle = await getPuzzleBySlug(resolvedParams.slug);
  if (!puzzle) return {};

  return {
    title: puzzle.title,
    description: puzzle.description,
    openGraph: {
      title: puzzle.title,
      description: puzzle.description,
      images: [
        `/api/og?title=${encodeURIComponent(puzzle.title)}&score=0&badge=${encodeURIComponent(
          "Daily Challenge"
        )}`,
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: puzzle.title,
      description: puzzle.description,
      images: [
        `/api/og?title=${encodeURIComponent(puzzle.title)}&score=0&badge=${encodeURIComponent(
          "Daily Challenge"
        )}`,
      ],
    },
  };
}

export default async function PuzzlePlayPage({
  params,
}: {
  params?: Promise<{ slug: string }>;
}) {
  const resolvedParams = await (params ?? Promise.resolve({ slug: "" }));
  const puzzle = await getPuzzleBySlug(resolvedParams.slug);
  if (!puzzle) return notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Game",
    name: puzzle.title,
    description: puzzle.description,
    genre: puzzle.type,
  };

  return (
    <div className="space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-h1 font-semibold tracking-tight">{puzzle.title}</h1>
            <p className="text-muted-foreground">{puzzle.description}</p>
            <div className="flex items-center gap-3">
              <DifficultyPill value={puzzle.difficulty} />
              <TimePill seconds={puzzle.estimatedTimeSec} />
            </div>
          </div>
          <GameRenderer puzzle={puzzle} />
        </div>
        <aside className="space-y-4">
          <Card className="p-5">
            <h3 className="text-sm font-semibold">Rules</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Match all pairs quickly to maximize your score. Fewer moves equals
              a higher rating.
            </p>
          </Card>
          <Card className="p-5">
            <h3 className="text-sm font-semibold">Leaderboard preview</h3>
            <p className="text-xs text-muted-foreground">
              Log in to submit your score globally.
            </p>
            <div className="mt-3">
              <LeaderboardTable />
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}
