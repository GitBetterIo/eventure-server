


CREATE TABLE "ev_user" (
  id SERIAL PRIMARY KEY,

  username VARCHAR NOT NULL,
  password_hash VARCHAR NOT NULL,
  password_reset_token VARCHAR,

  email VARCHAR,
  first_name VARCHAR,
  last_name VARCHAR,

  created TIMESTAMP without time zone DEFAULT (now() at time zone 'utc'),
  modified TIMESTAMP without time zone NOT NULL,
  last_login TIMESTAMP without time zone
)
