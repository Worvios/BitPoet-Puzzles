import { FilterBar } from "@/components/filter-bar";
import { PuzzleCard } from "@/components/puzzle-card";
import { getPuzzles } from "@/lib/content";

export const revalidate = 60;

export default async function PuzzlesPage() {
  const puzzles = await getPuzzles();

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-h1 font-semibold tracking-tight">Puzzles</h1>
        <p className="text-muted-foreground">
          Browse memory challenges and viral puzzle drops.
        </p>
      </header>
      <FilterBar />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {puzzles.map((puzzle) => (
          <PuzzleCard key={puzzle.id} puzzle={puzzle} />
        ))}
      </div>
    </div>
  );
}
