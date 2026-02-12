import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/search-input";

const filters = ["All", "Memory", "Timed", "Easy", "Hard", "< 2 min"];

export function FilterBar() {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border bg-background p-4 shadow-soft md:flex-row md:items-center md:justify-between">
      <SearchInput placeholder="Search puzzles" />
      <div className="flex flex-wrap items-center gap-2">
        {filters.map((filter) => (
          <Button key={filter} variant="outline" size="sm">
            {filter}
          </Button>
        ))}
      </div>
    </div>
  );
}
