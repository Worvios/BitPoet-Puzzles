import Link from "next/link";
import { Flame, Sparkles, TrendingUp } from "lucide-react";

import { DifficultyPill } from "@/components/difficulty-pill";
import { LeaderboardTable } from "@/components/leaderboard-table";
import { PuzzleCard } from "@/components/puzzle-card";
import { QuizCard } from "@/components/quiz-card";
import { TimePill } from "@/components/time-pill";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getDailyChallenge, getPuzzles, getQuizzes } from "@/lib/content";

export default async function Home() {
  const [daily, puzzles, quizzes] = await Promise.all([
    getDailyChallenge(),
    getPuzzles(),
    getQuizzes(),
  ]);

  return (
    <div className="space-y-12">
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-indigo-500/10 via-white to-emerald-400/10 shadow-lift">
          <div className="absolute inset-0 bg-hero-gradient" />
          <CardContent className="relative space-y-6 p-8">
            <div className="flex items-center gap-2 text-sm font-semibold text-primary">
              <Sparkles className="h-4 w-4" />
              Today’s Challenge
            </div>
            <div className="space-y-4">
              <h1 className="text-h1 font-semibold tracking-tight text-foreground sm:text-[2.5rem]">
                {daily.title}
              </h1>
              <p className="text-base text-muted-foreground">
                {daily.description}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <DifficultyPill value={daily.difficulty} />
                <TimePill seconds={daily.estimatedTimeSec} />
                <span className="text-sm text-muted-foreground">
                  Daily streak bonus ready
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href={`/puzzles/${daily.slug}`}>Play now</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/daily">See daily hub</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        <div className="space-y-4">
          <Card className="glass-card p-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <TrendingUp className="h-4 w-4 text-emerald-500" />
              Trending right now
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Players are racing through Tempo Trivia and Aurora Memory.
            </p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between rounded-2xl bg-muted/60 px-4 py-3">
                <span className="text-sm font-semibold">Tempo Trivia</span>
                <span className="text-xs text-muted-foreground">12.3k plays</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-muted/60 px-4 py-3">
                <span className="text-sm font-semibold">Aurora Memory</span>
                <span className="text-xs text-muted-foreground">9.4k plays</span>
              </div>
            </div>
          </Card>
          <Card className="glass-card p-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Flame className="h-4 w-4 text-rose-500" />
              Hard Mode
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Take on Velocity Vault for double points.
            </p>
            <Button variant="secondary" className="mt-4" asChild>
              <Link href="/puzzles/velocity-vault">Enter hard mode</Link>
            </Button>
          </Card>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-h2 font-semibold tracking-tight">New & hot</h2>
          <Button variant="outline" asChild>
            <Link href="/puzzles">Browse all</Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {puzzles.slice(0, 3).map((puzzle) => (
            <PuzzleCard key={puzzle.id} puzzle={puzzle} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-h2 font-semibold tracking-tight">Timed quizzes</h2>
          <Button variant="outline" asChild>
            <Link href="/quizzes">See quizzes</Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {quizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <h2 className="text-h2 font-semibold tracking-tight">Leaderboard preview</h2>
          <LeaderboardTable />
        </div>
        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold">Invite + earn rewards</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            New referral rewards are coming soon. Start inviting friends and
            lock in early bonuses.
          </p>
          <Button className="mt-4" asChild>
            <Link href="/invite">Invite friends</Link>
          </Button>
        </Card>
      </section>
    </div>
  );
}
