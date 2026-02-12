import { supabase } from "@/lib/supabase/client";

export type LeaderboardEntry = {
  id: string;
  puzzle_slug: string;
  user_id?: string | null;
  score: number;
  time_ms?: number | null;
  created_at: string;
};

export async function submitLeaderboardEntry(entry: {
  puzzle_slug: string;
  puzzle_id: string;
  score: number;
  time_ms: number;
  user_id?: string | null;
}) {
  return supabase.from("leaderboard_entries").insert({
    puzzle_slug: entry.puzzle_slug,
    puzzle_id: entry.puzzle_id,
    score: entry.score,
    time_ms: entry.time_ms,
    user_id: entry.user_id || null,
  });
}

export async function getLeaderboardEntries({
  puzzleSlug,
  limit = 10,
}: {
  puzzleSlug: string;
  limit?: number;
}) {
  return supabase
    .from("leaderboard_entries")
    .select("*")
    .eq("puzzle_slug", puzzleSlug)
    .order("score", { ascending: false })
    .limit(limit);
}
