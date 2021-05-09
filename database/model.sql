create database eventors_db;  

create extension pgcrypto;

create type role as enum ('user', 'moderator', 'admin');
-- table creation for categories
create table categories (
  category_id serial not null primary key,
  name text not null
);
-- table creation for users
create table users(
  user_id serial not null primary key,
  name varchar(64) not null,
  email text not null,
  password text not null,
  bio text not null,
  job_title text not null,
  phone_number varchar(13) not null,
  img_src text not null,
  location_link text not null,
  user_role role not null default 'user',
  category_id int references categories (category_id) not null,
  created_at timestamptz not null default current_timestamp
);
-- table creation for posts
create table posts(
  post_id serial not null primary key,
  title text not null,
  author_id int references users (user_id) not null,
  img_src text not null,
  created_at timestamptz not null default current_timestamp
);
-- table creation for profile views
create table profile_viewes(
  view_id serial not null primary key,
  user_id int references users (user_id) not null,
  created_at timestamptz not null default current_timestamp
);