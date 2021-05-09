-- here is the mock data form for sampling data
insert into categories 
  (name) 
values 
  ('Event Management Agency'), ('Place'), ('Individual staff')
returning 
  name;

insert into avatar_images 
  (user_id ,img_src ) 
values 
  (1, 'uploads/noimage.jpg') 
returning 
  user_id ,img_src ;

insert into users 
  (name, email, password, category_id, job_title ) 
values 
  ('Iskandar Ilkhomov', 'iilkhomov3@gmail.com' , crypt('gatsby7', gen_salt('bf')), 1, 'Video Editor') 
returning 
  name, email, category_id, job_title;

insert into posts 
  ( title, author_id)
values 
  ( 'It is my first video', 1 )
returning 
  title, author_id;

