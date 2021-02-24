const path = require("path");
const express = require("express");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");

const adminRoutes = require("./routes/admin");
const tripRoutes = require("./routes/trips");
//instantiating morgan for the logging purposes.
const morgan = require("morgan");
//controller which turns the function.
const errorController = require("./controllers/error");
//const mongoConnect = require('./util/database').mongoConnect;

const authRouter = require("./routes/auth");
//importing the auth Router.

// const  MongoDBStore  = require('connect-mongodb-session')(session);

// <<<<<<< HEAD
const URI =
  "mongodb+srv://test:test@cluster101.jqj99.mongodb.net/sample_training";
// //setting an instantiating the app.
// const app = express();
// const store=new MongoDBStore({
//    uri: URI,
//    collections:'sessions'
// })
// //setting up the express app
// =======
//setting an instantiating the setting the app.

const app = express();

//body parser and login.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("tiny"));

//settting the templating engine.
app.set("view engine", "ejs");
app.set("views", "views");
//body parser

//configuring the routes.
app.use("/auth", authRouter);
app.use("/trips", tripRoutes);
app.use("/admin", adminRoutes);
app.use(errorController.get404);
app.use(express.static(path.join(__dirname, "public")));

// using mongoose to connect to the database.
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection
  .once("open", () => {
    app.listen(3000);

    console.log("connected");
  })

  .on("error", () => {
    console.log("err");
  });
