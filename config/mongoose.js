const mongoose = require("mongoose");
const env = require("../config/environment");
//Not Stored Locally
mongoose.connect(`${env.db}`);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error Connecting to MongoDB"));

db.once("open", function () {
  console.log("Connected to Database");
});

module.exports = db;
