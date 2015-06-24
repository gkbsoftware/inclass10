DROP TABLE if exists tweets;

CREATE TABLE tweets (
  id serial primary key,
  body varchar(255),
  created_at timestamp
);
