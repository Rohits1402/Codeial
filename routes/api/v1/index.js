const express = require("express");

const router = express.Router();

//if any req comes for users we require user route
router.use("/posts", require("./posts"));
router.use("/users", require("./users"));
module.exports = router;
