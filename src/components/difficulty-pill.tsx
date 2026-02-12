import { Badge } from "@/components/ui/badge";
import type { Difficulty } from "@/types/puzzle";

const labels: Record<Difficulty, string> = {
  1: "Easy",
  2: "Chill",
  3: "Medium",
  4: "Hard",
  5: "Brutal",
};

export function DifficultyPill({ value }: { value: Difficulty }) {
  return (
    <Badge variant="secondary" className="rounded-full">
      {labels[value]}
    </Badge>
  );
}
