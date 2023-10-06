const express = require("express");

const router = express.Router();

//if any req comes for users we require user route
router.use("/v1", require("./v1"));

module.exports = router;
