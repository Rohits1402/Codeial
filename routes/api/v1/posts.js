const express = require("express");

const router = express.Router();
const passport = require("passport");
const postsApi = require("../../../controllers/api/v1/posts_api");
//if any req comes for users we require user route
router.get("/", postsApi.index);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  postsApi.destroy
);
module.exports = router;
