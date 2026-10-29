create type public.account_type as enum('student', 'professor', 'ta');
create type public.class_role as enum ('student', 'ta');

-- Profile creation 
create table profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null check(char_length(trim(display_name)) between 1 and 25),
  role public.account_type not null default 'student' check(role in ('student', 'professor', 'ta')),
  creature text not null default 'monster'
);

-- Assigns user role
create function public.user_role() 
returns public.account_type
language sql
as $$ 
  select role from public.profiles where id= auth.uid()
$$;
