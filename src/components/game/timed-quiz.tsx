"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { CompletionPayload, TimedQuizPuzzle } from "@/types/puzzle";
import { trackEvent } from "@/lib/analytics";

export function TimedQuiz({
  puzzle,
  onStart,
  onComplete,
}: {
  puzzle: TimedQuizPuzzle;
  onStart: () => void;
  onComplete: (payload: CompletionPayload) => void;
}) {
  const questions = puzzle.timedQuiz.questions;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(puzzle.timedQuiz.timeLimitSec);

  useEffect(() => {
    if (!startedAt) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [startedAt]);

  useEffect(() => {
    if (timeLeft === 0 && startedAt) {
      trackEvent("puzzle_fail", {
        puzzle_slug: puzzle.slug,
        type: puzzle.type,
        difficulty: puzzle.difficulty,
        duration_ms: Date.now() - startedAt,
        score,
      });
      const durationMs = Date.now() - startedAt;
      onComplete({
        puzzleId: puzzle.id,
        puzzleSlug: puzzle.slug,
        type: puzzle.type,
        difficulty: puzzle.difficulty,
        durationMs,
        score,
        resultLabel: score > questions.length * 200 ? "Lightning Scholar" : "Quick Thinker",
      });
    }
  }, [timeLeft, startedAt, onComplete, puzzle, score, questions.length]);

  const question = questions[currentIndex];

  const handleSelect = (index: number) => {
    if (selected !== null) return;
    if (!startedAt) {
      setStartedAt(Date.now());
      onStart();
    }

    setSelected(index);
    if (index === question.correctIndex) {
      setScore((prev) => prev + 250);
    }

    setTimeout(() => {
      if (currentIndex + 1 >= questions.length) {
        const durationMs = startedAt ? Date.now() - startedAt : 0;
        onComplete({
          puzzleId: puzzle.id,
          puzzleSlug: puzzle.slug,
          type: puzzle.type,
          difficulty: puzzle.difficulty,
          durationMs,
          score: index === question.correctIndex ? score + 250 : score,
          resultLabel: score > questions.length * 200 ? "Lightning Scholar" : "Quick Thinker",
        });
      } else {
        setCurrentIndex((prev) => prev + 1);
        setSelected(null);
      }
    }, 600);
  };

  const progress = useMemo(() => {
    return Math.round(((currentIndex + 1) / questions.length) * 100);
  }, [currentIndex, questions.length]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">Time left</p>
          <p className="text-lg font-semibold">{timeLeft}s</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Score</p>
          <p className="text-lg font-semibold">{score}</p>
        </div>
        <div className="w-full max-w-xs">
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>
      </div>

      <Card className="space-y-4 p-6">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Question {currentIndex + 1} of {questions.length}
          </p>
          <h3 className="text-xl font-semibold tracking-tight">
            {question.prompt}
          </h3>
        </div>
        <div className="grid gap-3">
          {question.options.map((option, index) => {
            const isCorrect = selected !== null && index === question.correctIndex;
            const isWrong = selected === index && index !== question.correctIndex;
            return (
              <Button
                key={option}
                variant="outline"
                className={cn(
                  "h-auto justify-start rounded-2xl border-2 px-4 py-3 text-left",
                  isCorrect && "border-emerald-300 bg-emerald-50",
                  isWrong && "border-rose-300 bg-rose-50"
                )}
                onClick={() => handleSelect(index)}
              >
                {option}
              </Button>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
