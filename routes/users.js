const express = require("express");
const passport = require("passport");

const router = express.Router();
const usersController = require("../controllers/users_controller");
router.get(
  "/profile/:id",
  passport.checkAuthentication,
  usersController.profile
);
router.post(
  "/update/:id",
  passport.checkAuthentication,
  usersController.update
);

router.get("/sign-in", usersController.signIn);
router.get("/sign-up", usersController.signUp);

router.get("/sign-out", usersController.destroySession);
router.post("/create", usersController.create);

//using passport as a middle for authentication and authorization
router.post(
  "/create-session",
  passport.authenticate("local", {
    failureRedirect: "/users/sign-up",
    failureFlash: "Invalid Username/Password",
  }),
  usersController.createSession
);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/users/sign-in" }),
  usersController.createSession
);
module.exports = router;
