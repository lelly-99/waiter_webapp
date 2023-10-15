import assert from "assert";
import waiter_availability from "../factory-function/waiter_availability.js";

describe("Waiter Availability Functions", function () {
  it("should return checked days as true and unchecked days as false", function () {
    var waiter = waiter_availability();
    const daysofweek = [
      { day_of_the_week: "Monday" },
      { day_of_the_week: "Tuesday" },
      { day_of_the_week: "Wednesday" },
      { day_of_the_week: "Thursday" },
      { day_of_the_week: "Friday" },
      { day_of_the_week: "Saturday" },
      { day_of_the_week: "Sunday" },
    ];

    const selectedDays = [
      { day_of_the_week: "Monday" },
      { day_of_the_week: "Tuesday" },
      { day_of_the_week: "Friday" },
    ];

    assert.deepEqual(waiter.checkedDays(selectedDays, daysofweek), [
      { day_of_the_week: "Monday", checked: true },
      { day_of_the_week: "Tuesday", checked: true },
      { day_of_the_week: "Wednesday", checked: false },
      { day_of_the_week: "Thursday", checked: false },
      { day_of_the_week: "Friday", checked: true },
      { day_of_the_week: "Saturday", checked: false },
      { day_of_the_week: "Sunday", checked: false },
    ]);
  });

  it("should return shedule for waiters", function () {
    var waiter = waiter_availability();
    const days = [
      { day_of_the_week: "Monday" },
      { day_of_the_week: "Tuesday" },
      { day_of_the_week: "Wednesday" },
      { day_of_the_week: "Thursday" },
      { day_of_the_week: "Friday" },
      { day_of_the_week: "Saturday" },
      { day_of_the_week: "Sunday" },
    ];

    const waiters = [
      { day_of_the_week: "Monday", waiter_name: "Lelly" },
      { day_of_the_week: "Tuesday", waiter_name: "Lelly" },
      { day_of_the_week: "Sunday", waiter_name: "Lelly" },
      { day_of_the_week: "Friday", waiter_name: "Lethabo" },
      { day_of_the_week: "Monday", waiter_name: "Lethabo" },
      { day_of_the_week: "Sunday", waiter_name: "Lethabo" },
    ];

    assert.deepEqual(waiter.dataInSchedule(days, waiters), {
      Monday: ["Lelly", "Lethabo"],
      Tuesday: ["Lelly"],
      Wednesday: [],
      Thursday: [],
      Friday: ["Lethabo"],
      Saturday: [],
      Sunday: ["Lelly", "Lethabo"],
    });
  });

  it("should return colored counts for each day", function () {
    var waiter = waiter_availability();

    const waiters = [
      { day_of_the_week: "Monday" },
      { day_of_the_week: "Tuesday" },
      { day_of_the_week: "Friday" },
      { day_of_the_week: "Monday" },
    ];

    assert.deepEqual(waiter.checkedDaysCount(waiters), {
      Monday: "yellow",
      Tuesday: "orange",
      Friday: "orange",
    });
  });

  it("should return color 'orange' when count is 1", function () {
    var waiter = waiter_availability();
    assert.equal(waiter.colorCount(1), "orange");
  });

  it("should return color 'yellow' when count 2", function () {
    var waiter = waiter_availability();
    assert.equal(waiter.colorCount(2), "yellow");
  });

  it("should return color 'green' when count is 3", function () {
    var waiter = waiter_availability();
    assert.equal(waiter.colorCount(3), "green");
  });

  it("should return color 'red' when count is 4 or more", function () {
    var waiter = waiter_availability();
    assert.equal(waiter.colorCount(4), "red");
  });
});
