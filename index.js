// import express from "express";
// import { engine } from "express-handlebars";
// import bodyParser from "body-parser";
// import flash from "connect-flash";
// import session from "express-session";
// import pgPromise from "pg-promise";
// import query from "./service/query.js";
// // import waiter_availability from "./factory-function/waiter_availability.js";

// //import routes
// import routes from "./routes/route.js";

// const pgp = pgPromise();


// // should we use a SSL connection
// let useSSL = false;
// let local = process.env.LOCAL || false;
// if (process.env.DATABASE_URL && !local) {
//   useSSL = true;
// }
// // which db connection to use
// const connectionString =
//   process.env.DATABASE_URL ||
//   "postgres://otzyymfe:0lGTbqnyGfXApYOVD2IceTfouyXP0oxi@silly.db.elephantsql.com/otzyymfe?ssl=true"

// const database = pgp(connectionString);
// const database_instance = query(database);

// //factory function
// // const waiter_availability_instance = waiter_availability();
// //route
// const route = routes(database_instance)

// const app = express();
// app.use(
//   session({
//     secret: "greet",
//     resave: false,
//     saveUninitialized: true,
//   })
// );
// app.use(flash());
// app.engine("handlebars", engine());
// app.set("view engine", "handlebars");
// app.set("views", "./views");
// app.use(express.static("public"));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(function (req, res, next) {
//   res.locals.messages = req.flash();
//   next();
// });

// app.get('/', route.get_login);
// app.post('/post_login', route.post_login);
// app.get('/waiter/:username', route.get_waiter);
// app.post('/waiter/:username', route.post_waiter);
// app.get('/days', route.get_days); 

// const PORT = process.env.PORT || 3007;
// app.listen(PORT, function () {
//   console.log("App started at port:", PORT);
// });

import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
import flash from "connect-flash";
import session from "express-session";
import pgPromise from "pg-promise";
import query from "./service/query.js";
import routes from "./routes/route.js";

const pgp = pgPromise();

// Should we use an SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}

// Database connection
const connectionString = process.env.DATABASE_URL || "postgres://otzyymfe:0lGTbqnyGfXApYOVD2IceTfouyXP0oxi@silly.db.elephantsql.com/otzyymfe?ssl=true";
const database = pgp(connectionString);
const database_instance = query(database);

const app = express();

// Configure middleware
app.use(
    session({
        secret: "greet",
        resave: false,
        saveUninitialized: true,
    })
);
app.use(flash());
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.locals.messages = req.flash();
    next();
});

// Define routes
const route = routes(database_instance);

app.get('/', route.get_login);
app.post('/post_login', route.post_login);
app.get('/waiter/:username', route.get_waiter);
app.post('/waiter/:username', route.post_waiter);
app.get('/days', route.get_days);
app.post('/reset', route.reset_schedule);

// Start the server
const PORT = process.env.PORT || 3007;
app.listen(PORT, function () {
    console.log("App started at port:", PORT);
});
