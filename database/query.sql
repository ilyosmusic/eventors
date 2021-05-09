select * from users where user_id = 1;

select 
  pt.post_id,
  pt.title,
  pt.slug as post_slug,
  pt.price,
  pt.phone_number,
  cat.slug as cat_slug,
  cat.name as cat_name
from posts as pt
join categories as cat
on pt.post_id = cat.category_id
order by pt.created_at desc
limit 25 offset (1 - 1) * 25;

select 
  usr.user_id,
  usr.name,
  usr.job_title,
  cat.slug as cat_slug,
  cat.name as cat_name
from users as usr
join categories as cat
on usr.category_id = cat.category_id;

update users set step=$2 where telegram_id=$1;

select * from users;