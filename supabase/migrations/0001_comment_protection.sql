-- ============================================================
-- 0001_comment_protection.sql
-- Adds moderation status + per-IP throttle to comments, requires a
-- non-blank name, and locks down Row-Level Security so that:
--   • readers (anon) can SELECT only 'visible' comments
--   • nobody can INSERT comments directly anymore — the post-comment
--     Edge Function (service role) is the only writer
--
-- Apply this AT THE SAME TIME you deploy the Edge Function and set
-- TURNSTILE_SITE_KEY in supabase.js. Until then, comments keep working
-- through the existing direct-insert path.
--
-- Run in: Supabase dashboard → SQL editor (or `supabase db push`).
-- Safe to re-run (idempotent).
-- ============================================================

-- 1. moderation status: 'visible' shows publicly; 'pending' is held for review.
alter table public.comments
  add column if not exists status text not null default 'visible';

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'comments_status_chk'
  ) then
    alter table public.comments
      add constraint comments_status_chk
      check (status in ('visible', 'pending', 'rejected'));
  end if;
end $$;

-- 2. a name is required.
update public.comments
  set author = 'Anonymous'
  where author is null or btrim(author) = '';

alter table public.comments alter column author set not null;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'comments_author_not_blank'
  ) then
    alter table public.comments
      add constraint comments_author_not_blank check (btrim(author) <> '');
  end if;
end $$;

-- 3. throttle log for per-IP rate limiting — stores only a salted hash, no raw IP.
create table if not exists public.comment_throttle (
  id         bigint generated always as identity primary key,
  ip_hash    text not null,
  created_at timestamptz not null default now()
);
create index if not exists comment_throttle_lookup
  on public.comment_throttle (ip_hash, created_at desc);

-- 4. Row-Level Security on comments.
alter table public.comments enable row level security;

-- readers see only visible comments
drop policy if exists comments_read_visible on public.comments;
create policy comments_read_visible on public.comments
  for select to anon, authenticated
  using (status = 'visible');

-- remove any prior anon/public INSERT policy: only the service role writes now.
drop policy if exists comments_anon_insert on public.comments;
drop policy if exists comments_insert on public.comments;
drop policy if exists "Enable insert for anon" on public.comments;

-- 5. throttle table: RLS on, no policies → unreachable by anon; service role bypasses RLS.
alter table public.comment_throttle enable row level security;

-- ------------------------------------------------------------
-- Moderation cheatsheet (run by hand in the SQL editor):
--   approve a held comment:
--     update public.comments set status = 'visible' where id = '<uuid>';
--   reject it:
--     update public.comments set status = 'rejected' where id = '<uuid>';
--   list everything awaiting review:
--     select id, protocol_id, author, body, created_at
--       from public.comments where status = 'pending' order by created_at;
--   tidy old throttle rows (optional housekeeping):
--     delete from public.comment_throttle where created_at < now() - interval '1 day';
-- ------------------------------------------------------------
