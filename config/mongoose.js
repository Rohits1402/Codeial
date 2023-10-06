const mongoose = require("mongoose");

//Not Stored Locally
mongoose.connect(
  "mongodb+srv://rschauhan1402:rohit2001@cluster0.l6lgral.mongodb.net/"
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error Connecting to MongoDB"));

db.once("open", function () {
  console.log("Connected to Database");
});

module.exports = db;
