const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");

//tell passport to use a new strategy for google login
passport.use(
  new googleStrategy(
    {
      clientID:
        "363341655295-9mu20sefbns3hq5iavahdq0us25cno69.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8000/users/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      // find the user
      const user = await User.findOne({ email: profile.emails[0].value });

      console.log(profile);

      if (user) {
        // if found set this user as req.user
        return done(null, user);
      } else {
        User.create({
          // if not found, create the user and set it as req.user
          name: profile.displayName,
          email: profile.emails[0].value,
          password: crypto.randomBytes(20).toString("hex"),
        });
        return done(null, user);
      }
    }
  )
);

module.exports = passport;
