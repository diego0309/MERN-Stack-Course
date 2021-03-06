const express = require("express");
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const bodyParser = require("body-parser");
const app = express();
const passport = require("passport");

const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");
const users = require("./routes/api/users");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Connect to mongoDB
mongoose
  .connect(db)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(err => console.log(err));

//Use Routes
app.use("/api/profile", profile);
app.use("/api/users", users);
app.use("/api/posts", posts);

//Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server running on port " + port);
});
