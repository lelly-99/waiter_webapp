
CREATE TABLE waiter_availability (
    id SERIAL NOT NULL PRIMARY KEY,
    day_of_the_week TEXT NOT NULL,
    available BOOLEAN NOT NULL,
    number_of_waiters INT,
    username TEXT
);

INSERT INTO waiter_availability (day_of_the_week, available) VALUES ('Monday', 3);
INSERT INTO waiter_availability (day_of_the_week, available) VALUES ('Tuesday', 3);
INSERT INTO waiter_availability (day_of_the_week, available) VALUES ('Wednesday', 3);
INSERT INTO waiter_availability (day_of_the_week, available) VALUES ('Friday', 3);
INSERT INTO waiter_availability (day_of_the_week, available) VALUES('Thursday', 3);







  




