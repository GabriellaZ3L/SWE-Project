-- TODO: Replace the secrurity workarounds with actual secure code
alter table public.profiles disable row level security;
alter table public.tasks disable row level security;
alter table public.completion disable row level security;
alter table public.achievements disable row level security;
