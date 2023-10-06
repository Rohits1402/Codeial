const express = require("express");
const homeController = require("../controllers/home_controller");
//creating router
const router = express.Router();

router.get("/", homeController.home);

//if any req comes for users we require user route
router.use("/users", require("./users"));

router.use("/posts", require("./posts"));

router.use("/api", require("./api"));

router.use("/likes", require("./likes"));

router.use("/friends", require("./friends"));

router.use("/forgotPswd", require("./forgotPswd"));

router.use("/comments", require("./comments"));
module.exports = router;
