DROP TABLE if exists tweets;
DROP TABLE if exists users;

CREATE TABLE tweets (
  id serial primary key,
  body varchar(255),
  created_at timestamp,
  username varchar(20)
);

CREATE TABLE users (
  id serial primary key,
  username varchar(20)
);
