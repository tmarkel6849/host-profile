DROP DATABASE IF EXISTS hostprofiles;

CREATE DATABASE hostprofiles;

\c hostprofiles;

-- remove the language fiels since there will be a join table instead
CREATE TABLE hosts (
  id SERIAL NOT NULL,
  name VARCHAR NOT NULL,
  description VARCHAR NOT NULL,
  interaction VARCHAR NOT NULL,
  datejoined VARCHAR NOT NULL,
  responserate VARCHAR NOT NULL,
  responsetime VARCHAR NOT NULL,
  hosturl VARCHAR NOT NULL
);

CREATE TABLE languages (
  id SERIAL NOT NULL,
  language VARCHAR
);

CREATE TABLE hostlanguages (
  id SERIAL NOT NULL,
  host_id SMALLINT NOT NULL,
  language_id SMALLINT NOT NULL
);

CREATE TABLE cohost (
  id SERIAL NOT NULL,
  host_id SMALLINT NOT NULL,
  cohost_id SMALLINT NOT NULL
);