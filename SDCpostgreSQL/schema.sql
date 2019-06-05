DROP DATABASE IF EXISTS hostprofiles;

CREATE DATABASE hostprofiles;

\c hostprofiles;

CREATE TABLE hosts (
  id SERIAL NOT NULL,
  name VARCHAR NOT NULL,
  description VARCHAR NOT NULL,
  interaction VARCHAR NOT NULL,
  cohosts VARCHAR NOT NULL,
  datajoined VARCHAR NOT NULL,
  responserate VARCHAR NOT NULL,
  responsetime VARCHAR NOT NULL,
  hosturl VARCHAR NOT NULL
);


-- INSERT INTO hosts (name, description, interaction, cohosts, datajoined, responserate, responsetime, hosturl) VALUES ('bobby', 'bobby is cool', 'usually in a bath robe', 'bobby works well with others', 'year 1990', 'real fast like', 'some time before', 'boby.url')