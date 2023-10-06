const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

//authentication using passport.js
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },

    async (req, email, password, done) => {
      const user = await User.findOne({ email: email });
      if (!user || user.password != password) {
        req.flash("error", "Invalid Username/Password");
        return done(null, false);
      }
      return done(null, user);
    }
  )
);

//serialize the user to decide which key is to be kept in cookies
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

//deserializing the user from the key in the cookies
passport.deserializeUser(async function (id, done) {
  let user = await User.findById(id);
  return done(null, user);
});

//check if user is authenticated
passport.checkAuthentication = (req, res, next) => {
  //if the user is signed in, pass on the request on the next function
  if (req.isAuthenticated()) {
    return next();
  }

  //if user not signed in
  return res.redirect("/users/sign-in");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    //req.user contains the current signed user from the session cookie ans we are just sending this to the locals for the views
    res.locals.user = req.user;
  }

  next();
};
module.exports = passport;
