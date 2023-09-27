
CREATE TABLE waiter_availability (
    id SERIAL PRIMARY KEY,
    day_of_the_week VARCHAR(20) NOT NULL,
);

CREATE TABLE waiters (
    waiter_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    waiter_availability_id int REFERENCES waiter_availability(id)
);

INSERT INTO waiter_availability (day_of_the_week) VALUES
  ('Monday'),
  ('Tuesday'),
  ('Wednesday'),
  ('Friday'),
  ('Thursday');


  




