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
  this.timeout(60000);
  beforeEach(async function () {
    // Clean the tables before each test run
    await data.deleteSchedule();
  });

  describe("Waiter Availability Queries", function () {
    it("should be able to return days of the week", async function () {
      const days = await data.getDays();
      assert.deepEqual(days, [
        {
          day_of_the_week: "Monday",
        },
        {
          day_of_the_week: "Tuesday",
        },
        {
          day_of_the_week: "Wednesday",
        },
        {
          day_of_the_week: "Thursday",
        },
        {
          day_of_the_week: "Friday",
        },
        {
          day_of_the_week: "Saturday",
        },
        {
          day_of_the_week: "Sunday",
        },
      ]);
    });
    
    it("should be able to insert username", async function () {
      const user = "lelly";
      const insert_user = await data.insertUser(user);
      assert.equal(insert_user, user);
    });

  });

  after(function () {
    pgp.end();
  });
});
