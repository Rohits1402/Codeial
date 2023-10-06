const express = require("express");
const usersApi = require("../../../controllers/api/v1/users_api");
const router = express.Router();

//if any req comes for users we require user route
router.post("/create-session", usersApi.createSession);
module.exports = router;
