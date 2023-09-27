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

describe('Greeting with routes database', function(){
    this.timeout(60000);
    beforeEach(async function(){
        // Clean the tables before each test run
        await data.reset();
    });

    after(function () {
        pgp.end();
    });
});

