import assert from "assert";
import pgPromise from "pg-promise";
import query from "../service/query.js";

const pgp = pgPromise();

// should we use an SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
  useSSL = true;
}

// which db connection to use
const connectionString =
  process.env.DATABASE_URL ||
  "postgres://otzyymfe:0lGTbqnyGfXApYOVD2IceTfouyXP0oxi@silly.db.elephantsql.com/otzyymfe?ssl=true";

const database = pgp(connectionString);
const data = query(database);

describe("Waiter Availability", function () {
  this.timeout(900000);
  beforeEach(async function () {
    // Clean the tables before each test run
    await data.deleteSchedule();
  });

  describe("Waiter Availability Queries", function () {
    it("should be able to return days of the week", async function () {
      const days = await data.getDays();
      assert.deepEqual(days, [
        { day_of_the_week: "Monday" },
        { day_of_the_week: "Tuesday" },
        { day_of_the_week: "Wednesday" },
        { day_of_the_week: "Thursday" },
        { day_of_the_week: "Friday" },
        { day_of_the_week: "Saturday" },
        { day_of_the_week: "Sunday" },
      ]);
    });

    it("should be able to insert user credentials and display the schedule", async function () {
      const waiterName = "Lelly";
      const selectedDays = ["Monday", "Tuesday", "Wednesday"];
      await data.insertUser(waiterName, 'pass12345');
      await data.insertSchedule(waiterName, selectedDays);
      const days = await data.getWaiterSchedule();
      days.sort((a, b) => (a.day_of_the_week > b.day_of_the_week ? 1 : -1));
    
      const waiterDays = [
        { waiter_name: 'Lelly', day_of_the_week: 'Monday' },
        { waiter_name: 'Lelly', day_of_the_week: 'Tuesday' },
        { waiter_name: 'Lelly', day_of_the_week: 'Wednesday' }
      ];
  
      waiterDays.sort((a, b) => (a.day_of_the_week > b.day_of_the_week ? 1 : -1));
    
      assert.deepStrictEqual(days, waiterDays);
    });
    
    it("should be able to reset schedule", async function () {
      const waiterName = "Lelly";
      const selectedDays = ["Monday", "Friday", "Wednesday", "Sunday"];
      await data.insertUser(waiterName, 'password');
      await data.insertSchedule(waiterName, selectedDays);
      var reset = await data.deleteSchedule();
      assert.equal(reset, undefined);
    });

    it("should be able to get days for a specific user", async function () {
      const waiterName = "Lelly";
      await data.insertUser(waiterName, 'password');
      await data.insertSchedule(waiterName, ["Monday", "Tuesday", "Wednesday"]);
    
      const selectedDays = await data.getSelectedDaysForWaiter(waiterName);
      selectedDays.sort((a, b) => (a.day_of_the_week > b.day_of_the_week ? 1 : -1));
    
      const days = [
        { day_of_the_week: 'Monday' },
        { day_of_the_week: 'Tuesday' },
        { day_of_the_week: 'Wednesday' }
      ];
      days.sort((a, b) => (a.day_of_the_week > b.day_of_the_week ? 1 : -1));
    
      assert.deepStrictEqual(days, selectedDays);
    });
    
    it("should be able to delete user selected days", async function () {
      const waiterName = "Lelly";
      const selectedDays = ["Monday", "Friday", "Wednesday", "Sunday"];
      await data.insertUser(waiterName, 'password');
      await data.insertSchedule(waiterName, selectedDays);
      var deleteDays = await data.deleteWiterSelectedDays(waiterName);
      assert.equal(deleteDays, undefined);
    });

  });

  after(function () {
    pgp.end();
  });
});
