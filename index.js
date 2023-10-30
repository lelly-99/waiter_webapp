import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
import flash from "connect-flash";
import session from "express-session";
import pgPromise from "pg-promise";
import query from "./service/query.js";
import sign_up from "./routes/sign_up.js"
import login from "./routes/login.js";
import waiters from "./routes/waiters.js";
import days from "./routes/days.js";
import waiter_availability from "./factory-function/waiter_availability.js";


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

//route instances
const sign = sign_up(database_instance, waiter_instance);
const log = login(database_instance);
const waiter = waiters(database_instance, waiter_instance);
const day = days(database_instance, waiter_instance)

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

//url login confirmation
const authenticate = (req, res, next) => {
    if (req.session.user) {
        next();
      } else {
        req.flash("error", "Please login to access the URL");
        res.redirect('/login');
      }
};

//routes
app.get('/', sign.get_sign_up);
app.post('/sign_in', sign.post_sign_up);
app.get('/login', log.get_login);
app.post('/login', log.post_login);
app.get('/waiter/:username',authenticate, waiter.get_waiter);
app.post('/waiter/:username',authenticate, waiter.post_waiter);
app.get('/days', day.get_days);
app.post('/reset', day.reset_schedule);
app.get('/reschedule', day.get_reschedule_waiter);
app.post('/reschedule', day.post_reschedule_waiter);
app.post('/logout', waiter.logout);
  
// Start the server
const PORT = process.env.PORT || 3007;
app.listen(PORT, function () {
    console.log("App started at port:", PORT);
});
