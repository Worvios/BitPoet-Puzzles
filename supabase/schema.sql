-- Leaderboard entries
create table if not exists public.leaderboard_entries (
  id uuid primary key default gen_random_uuid(),
  puzzle_id text not null,
  puzzle_slug text not null,
  user_id uuid,
  score integer not null,
  time_ms integer,
  created_at timestamptz default now()
);

create index if not exists leaderboard_entries_puzzle_slug_idx
  on public.leaderboard_entries (puzzle_slug);

create index if not exists leaderboard_entries_created_at_idx
  on public.leaderboard_entries (created_at desc);

-- Optional user profile
create table if not exists public.user_profiles (
  id uuid primary key,
  display_name text,
  avatar_url text,
  created_at timestamptz default now()
);

alter table public.user_profiles
  add constraint user_profiles_id_fkey
  foreign key (id)
  references auth.users (id)
  on delete cascade;
