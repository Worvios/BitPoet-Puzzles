import Image from "next/image";
import Link from "next/link";

import { DifficultyPill } from "@/components/difficulty-pill";
import { TimePill } from "@/components/time-pill";
import { Card, CardContent } from "@/components/ui/card";
import type { QuizPack } from "@/types/puzzle";

export function QuizCard({ quiz }: { quiz: QuizPack }) {
  return (
    <Link href={`/quizzes/${quiz.slug}`}>
      <Card className="group h-full overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lift">
        <div className="relative h-40 w-full overflow-hidden">
          <Image
            src={quiz.heroImage || "/images/placeholder.svg"}
            alt={quiz.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent" />
        </div>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2">
            <DifficultyPill value={quiz.difficulty} />
            <TimePill seconds={quiz.estimatedTimeSec} />
          </div>
          <div>
            <h3 className="text-lg font-semibold tracking-tight">
              {quiz.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {quiz.description}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
