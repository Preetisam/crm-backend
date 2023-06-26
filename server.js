const mongoose = require("mongoose");
const dbConfig = require("./config/db.config");
const serverConfig = require("./config/server.config");
const User = require("./models/user.model");
const bcrypt = require("bcryptjs");
var cors = require("cors");

//Express setting
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Establish connection
mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;

db.on("error", () => {
  console.log("Error while establishing the connection");
});

db.once("open", () => {
  console.log("Connected to mongo DB");

  //Create an Admin if not exist
  init();
});

async function init() {
  var user = await User.findOne({ userId: "admin" });

  if (user) {
    console.log("Admin user is already present");
    return;
  }
  try {
    user = await User.create({
      name: "Jeevendra",
      userId: "admin",
      email: "jeevendra.singh1992@gmail.com",
      userType: "ADMIN",
      userStatus: "APPROVED",
      password: bcrypt.hashSync("Welcome1", 8),
    });
    console.log(user);
  } catch (e) {
    console.log("Error while creating admin user " + e);
  }
}

//Import routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/ticket.route")(app);

//App(server) listen for HTTP request at port 8080
app.listen(serverConfig.PORT, () => {
  console.log("Application started at port 8080");
});
