import { Trophy } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export function ResultCard({
  score,
  label,
  percentile,
}: {
  score: number;
  label: string;
  percentile: string;
}) {
  return (
    <Card className="glass-card">
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Trophy className="h-6 w-6" />
          </span>
          <div>
            <p className="text-sm text-muted-foreground">Final Score</p>
            <p className="text-2xl font-semibold tracking-tight">{score}</p>
          </div>
        </div>
        <div className="rounded-2xl bg-muted/60 p-4">
          <p className="text-sm text-muted-foreground">Badge</p>
          <p className="text-lg font-semibold">{label}</p>
          <p className="text-sm text-muted-foreground">
            You beat {percentile} of players today.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
