create extension if not exists "uuid-ossp";

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  role text not null default 'student' check (role in ('student', 'admin')),
  created_at timestamptz not null default now()
);

create table public.products (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  name text not null,
  price integer not null check (price > 0),
  product_type text not null check (product_type in ('ebook', 'course', 'package', 'consulting')),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.orders (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  product_id uuid not null references public.products(id),
  toss_order_id text not null unique,
  payment_key text unique,
  amount integer not null check (amount > 0),
  status text not null default 'pending' check (status in ('pending', 'paid', 'failed', 'refunded')),
  created_at timestamptz not null default now()
);

create table public.entitlements (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  product_id uuid not null references public.products(id),
  order_id uuid references public.orders(id) on delete set null,
  starts_at timestamptz not null default now(),
  ends_at timestamptz,
  unique (user_id, product_id)
);

create table public.lessons (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  module_title text not null,
  stream_uid text,
  position integer not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.resources (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  storage_path text not null,
  resource_type text not null check (resource_type in ('pdf', 'template', 'checklist')),
  published boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.assignments (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  storage_path text,
  status text not null default 'submitted' check (status in ('draft', 'submitted', 'reviewed')),
  feedback text,
  created_at timestamptz not null default now()
);

create table public.posts (
  id uuid primary key default uuid_generate_v4(),
  author_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  body text not null,
  post_type text not null default 'question' check (post_type in ('notice', 'question', 'feedback')),
  created_at timestamptz not null default now()
);

create table public.comments (
  id uuid primary key default uuid_generate_v4(),
  post_id uuid not null references public.posts(id) on delete cascade,
  author_id uuid not null references public.profiles(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

create table public.consulting_bookings (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  order_id uuid references public.orders(id) on delete set null,
  scheduled_at timestamptz,
  status text not null default 'pending' check (status in ('pending', 'scheduled', 'completed', 'cancelled')),
  notes text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.orders enable row level security;
alter table public.entitlements enable row level security;
alter table public.lessons enable row level security;
alter table public.resources enable row level security;
alter table public.assignments enable row level security;
alter table public.posts enable row level security;
alter table public.comments enable row level security;
alter table public.consulting_bookings enable row level security;

create policy "profiles read own"
  on public.profiles for select
  using (auth.uid() = id);

create policy "orders read own"
  on public.orders for select
  using (auth.uid() = user_id);

create policy "entitlements read own"
  on public.entitlements for select
  using (auth.uid() = user_id);

create policy "lessons read published"
  on public.lessons for select
  using (published = true);

create policy "resources read published"
  on public.resources for select
  using (published = true);

create policy "assignments read own"
  on public.assignments for select
  using (auth.uid() = user_id);

create policy "assignments insert own"
  on public.assignments for insert
  with check (auth.uid() = user_id);

create policy "posts read authenticated"
  on public.posts for select
  to authenticated
  using (true);

create policy "comments read authenticated"
  on public.comments for select
  to authenticated
  using (true);

create policy "consulting bookings read own"
  on public.consulting_bookings for select
  using (auth.uid() = user_id);
