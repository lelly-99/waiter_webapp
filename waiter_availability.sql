CREATE TABLE weekdays (
    id SERIAL PRIMARY KEY,
    day_of_the_week VARCHAR(20) NOT NULL
);

CREATE TABLE waiters (
    waiter_id SERIAL PRIMARY KEY, 
    waiter_name VARCHAR(50) NOT NULL
);

CREATE TABLE schedule (
    schedule_id SERIAL PRIMARY KEY,
    weekdays_id INT REFERENCES weekdays(id),
    waiter_name_id INT REFERENCES waiters(waiter_id)
);

INSERT INTO weekdays (day_of_the_week) VALUES
    ('Monday'),
    ('Tuesday'),
    ('Wednesday'),
    ('Thursday'),
    ('Friday'),
    ('Saturday'),
    ('Sunday');

-- for the weekdays (all 7 days) pre-populated.
-- for the waiter details (name)
-- Will be schedule, which will have foreign keys from both tables (name_id, weekdays_id)















  




