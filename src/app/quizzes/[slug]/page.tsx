import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { GameRenderer } from "@/components/game/game-renderer";
import { DifficultyPill } from "@/components/difficulty-pill";
import { LeaderboardTable } from "@/components/leaderboard-table";
import { TimePill } from "@/components/time-pill";
import { Card } from "@/components/ui/card";
import { getQuizBySlug } from "@/lib/content";
import type { PuzzleContent } from "@/types/puzzle";

export async function generateMetadata({
  params,
}: {
  params?: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await (params ?? Promise.resolve({ slug: "" }));
  const quiz = await getQuizBySlug(resolvedParams.slug);
  if (!quiz) return {};

  return {
    title: quiz.title,
    description: quiz.description,
    openGraph: {
      title: quiz.title,
      description: quiz.description,
      images: [
        `/api/og?title=${encodeURIComponent(quiz.title)}&score=0&badge=${encodeURIComponent(
          "Timed Quiz"
        )}`,
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: quiz.title,
      description: quiz.description,
      images: [
        `/api/og?title=${encodeURIComponent(quiz.title)}&score=0&badge=${encodeURIComponent(
          "Timed Quiz"
        )}`,
      ],
    },
  };
}

export default async function QuizPlayPage({
  params,
}: {
  params?: Promise<{ slug: string }>;
}) {
  const resolvedParams = await (params ?? Promise.resolve({ slug: "" }));
  const quiz = await getQuizBySlug(resolvedParams.slug);
  if (!quiz) return notFound();

  const puzzle: PuzzleContent = {
    ...quiz,
    type: "timedQuiz",
    timedQuiz: quiz.timedQuiz,
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: quiz.title,
    description: quiz.description,
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
            <h1 className="text-h1 font-semibold tracking-tight">{quiz.title}</h1>
            <p className="text-muted-foreground">{quiz.description}</p>
            <div className="flex items-center gap-3">
              <DifficultyPill value={quiz.difficulty} />
              <TimePill seconds={quiz.estimatedTimeSec} />
            </div>
          </div>
          <GameRenderer puzzle={puzzle} />
        </div>
        <aside className="space-y-4">
          <Card className="p-5">
            <h3 className="text-sm font-semibold">Rules</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Answer as many as you can before the timer hits zero. Speed boosts
              your final score.
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
