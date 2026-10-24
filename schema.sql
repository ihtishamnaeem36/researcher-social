-- ==============================================================================
-- Synapse: Researcher Social Media Database Schema (Supabase)
-- 100% Free Tier Compatible (PostgreSQL + Row-Level Security)
-- ==============================================================================

-- 1. Enable UUID Extension
create extension if not exists "uuid-ossp";

-- 2. Create Profiles Table (Linked to Supabase Auth)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique not null,
  full_name text,
  institution text,
  avatar_url text,
  field_of_study text default 'General Science',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on Profiles
alter table public.profiles enable row level security;

-- Profiles Policies
create policy "Public profiles are viewable by everyone." 
  on public.profiles for select using (true);

create policy "Users can insert their own profile." 
  on public.profiles for insert with check (auth.uid() = id);

create policy "Users can update their own profile." 
  on public.profiles for update using (auth.uid() = id);


-- 3. Create Posts Table (Carousels & Deep-Dive Decks)
create table if not exists public.posts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete set null,
  paper_title text not null,
  paper_url text,
  authors text default 'Anonymous Researcher',
  field_tag text default 'AI & Machine Learning',
  theme text default 'obsidian',
  slides jsonb not null default '[]'::jsonb, -- Array of slide objects (hook, method, results, critique)
  likes_count integer default 0,
  comments jsonb default '[]'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on Posts
alter table public.posts enable row level security;

-- Posts Policies
-- Allow anyone to read posts
create policy "Anyone can read posts." 
  on public.posts for select using (true);

-- Allow authenticated users (or anon with key) to insert posts
create policy "Anyone can create research posts." 
  on public.posts for insert with check (true);

-- Allow updating likes count
create policy "Anyone can update likes on posts." 
  on public.posts for update using (true);


-- 4. Create User Interactions Table (Likes & Bookmarks)
create table if not exists public.interactions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade,
  post_id uuid references public.posts(id) on delete cascade not null,
  interaction_type text check (interaction_type in ('like', 'bookmark')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (user_id, post_id, interaction_type)
);

-- Enable RLS on Interactions
alter table public.interactions enable row level security;

create policy "Anyone can view interactions." 
  on public.interactions for select using (true);

create policy "Authenticated users can create interactions." 
  on public.interactions for insert with check (true);

create policy "Users can remove their own interactions." 
  on public.interactions for delete using (true);

-- 5. Optional Realtime Publication
-- In Supabase dashboard: Database -> Replication -> enable 'posts' table for realtime updates!
