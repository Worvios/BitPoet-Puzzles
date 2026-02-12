import Link from "next/link";

import { DifficultyPill } from "@/components/difficulty-pill";
import { PuzzleCard } from "@/components/puzzle-card";
import { TimePill } from "@/components/time-pill";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getDailyChallenge, getPuzzles } from "@/lib/content";

export default async function DailyPage() {
  const [daily, puzzles] = await Promise.all([
    getDailyChallenge(),
    getPuzzles(),
  ]);

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-h1 font-semibold tracking-tight">Daily Challenge</h1>
        <p className="text-muted-foreground">
          Keep your streak alive and unlock weekly bonuses.
        </p>
      </header>

      <Card className="p-6 glass-card">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Today’s featured</p>
            <h2 className="text-2xl font-semibold tracking-tight">{daily.title}</h2>
            <div className="mt-2 flex items-center gap-2">
              <DifficultyPill value={daily.difficulty} />
              <TimePill seconds={daily.estimatedTimeSec} />
            </div>
          </div>
          <Button asChild>
            <Link href={`/puzzles/${daily.slug}`}>Play daily</Link>
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold">Streak status</h3>
        <p className="text-sm text-muted-foreground">
          You’re on a 4-day streak. Log in to save it globally.
        </p>
      </Card>

      <section className="space-y-4">
        <h2 className="text-h2 font-semibold tracking-tight">More daily picks</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {puzzles.slice(1, 4).map((puzzle) => (
            <PuzzleCard key={puzzle.id} puzzle={puzzle} />
          ))}
        </div>
      </section>
    </div>
  );
}
