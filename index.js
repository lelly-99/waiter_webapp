import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
import flash from "connect-flash";
import session from "express-session";
import pgPromise from "pg-promise";
import query from "./service/query.js";
import routes from "./routes/route.js";
import waiter_availability from "./factory-function/waiter_availability.js";
import Handlebars from 'handlebars';


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
//ff
const waiter_instance = waiter_availability()
//route instance
const route = routes(database_instance, waiter_instance);
//ff instance

const app = express();

//middleware configuration
app.use(
    session({
        secret: "waiter web app",
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

//routes
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
