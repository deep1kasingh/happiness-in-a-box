-- Day completions: one row per (user_id, path_id, date)
-- Used when NEXT_PUBLIC_USE_SUPABASE=true

create table if not exists public.day_completions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  path_id text not null,
  date text not null,
  completed_tasks jsonb not null default '{}',
  full_day_completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, path_id, date)
);

create index if not exists idx_day_completions_user_date
  on public.day_completions(user_id, date);

alter table public.day_completions enable row level security;

create policy "Users can read own completions"
  on public.day_completions for select
  using (auth.uid() = user_id);

create policy "Users can insert own completions"
  on public.day_completions for insert
  with check (auth.uid() = user_id);

create policy "Users can update own completions"
  on public.day_completions for update
  using (auth.uid() = user_id);

create policy "Users can delete own completions"
  on public.day_completions for delete
  using (auth.uid() = user_id);

comment on table public.day_completions is 'Task completion per user per path per day (production).';
