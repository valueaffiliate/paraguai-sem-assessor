-- Paraguai Sem Assessor — pedidos, eventos de pagamento e acessos liberados.
-- Rode no SQL Editor do Supabase (ou `supabase db push`).
-- As tabelas só são acessadas pelo servidor (service role). RLS ligado e sem políticas públicas,
-- exceto leitura do próprio acesso pelo aluno logado.

create extension if not exists "pgcrypto";

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  product text not null,
  amount_cents integer not null check (amount_cents > 0),
  currency text not null default 'BRL',
  status text not null default 'pending'
    check (status in ('pending', 'paid', 'failed', 'expired', 'refunded', 'canceled')),
  customer_name text not null,
  customer_email text not null,
  customer_document text not null,
  customer_phone text,
  provider text not null,
  provider_charge_id text,
  payment_method text,
  payment_data jsonb,
  paid_at timestamptz,
  utm jsonb
);
create unique index if not exists orders_provider_charge_uidx on public.orders (provider, provider_charge_id);
create index if not exists orders_email_idx on public.orders (lower(customer_email));

create table if not exists public.payment_events (
  id bigserial primary key,
  received_at timestamptz not null default now(),
  provider text not null,
  provider_event_id text,
  order_id uuid references public.orders (id),
  status text,
  payload jsonb not null
);
create unique index if not exists payment_events_uidx on public.payment_events (provider, provider_event_id)
  where provider_event_id is not null;

create table if not exists public.entitlements (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null,
  product text not null,
  order_id uuid references public.orders (id),
  revoked_at timestamptz
);
create unique index if not exists entitlements_email_product_uidx on public.entitlements (email, product);
alter table public.entitlements add constraint entitlements_email_lower check (email = lower(email));

alter table public.orders enable row level security;
alter table public.payment_events enable row level security;
alter table public.entitlements enable row level security;

-- O aluno logado pode ler apenas o próprio acesso.
drop policy if exists "aluno le o proprio acesso" on public.entitlements;
create policy "aluno le o proprio acesso" on public.entitlements
  for select to authenticated
  using (lower(email) = lower(auth.jwt() ->> 'email'));
