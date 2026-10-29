-- Tasks/Assignments inital table creation
create table public.tasks(
  id integer generated always as identity primary key,
  title text not null,
  points integer not null check(points between 0 and 100),
  due_at timestamptz not null
);

-- Stores completed assignments
create table public.completion(
  task_id integer not null references public.tasks(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  points_given integer not null,
  primary key(task_id, user_id)
);

-- Marks assignments as complete and puts it into the complete task table
create function public.complete_task(task_complete_id integer)
returns integer
language sql
security definer
set search_path= ''
as $$
  insert into public.completion (task_id, user_id, points_given)
  select id, auth.uid(), case when now() > due_at then 0 else points end
  from public.tasks
  where id= task_complete_id and public.user_role()= 'student'
  returning points_given;
$$;
