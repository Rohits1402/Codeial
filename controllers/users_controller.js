const User = require("../models/user");
const fs = require("fs");
const path = require("path");
//Render Profile Page
module.exports.profile = async function (req, res) {
  const user = await User.findById(req.params.id);

  return res.render("user_profile", {
    title: "User Profile",
    profile_user: user,
  });
};

//Update User Profile
module.exports.update = async function (req, res) {
  if (req.user.id == req.params.id) {
    try {
      let user = await User.findByIdAndUpdate(req.params.id);
      //Using this because input type is multipart
      User.uploadedAvatar(req, res, function (err) {
        if (err) {
          console.log("Multer Error");
        }

        user.name = req.body.name;
        user.email = req.body.email;

        if (req.file) {
          if (user.avatar) {
            fs.existsSync(path.join(__dirname, "..", user.avatar));
          }

          //saving the path of the uploaded file into the avatar field in the user
          user.avatar = User.avatarPath + "/" + req.file.filename;
        }
        user.save();
      });

      return res.redirect("back");
    } catch (err) {
      req.flash("error", err);
      return res.redirect("back");
    }
  } else {
    req.flash("error", "Unauthorized");
    return res.status(401).send("Unauthorized");
  }
};

//Render Sign Up Page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  res.render("user_sign_up", {
    title: "User Sign Up",
  });
};

//Render Sign In Page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  res.render("user_sign_in", {
    title: "User Sign In",
  });
};

//Get the sign up data
module.exports.create = async function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      try {
        User.create(req.body);
        return res.redirect("/users/sign-in");
      } catch (error) {
        console.log("Error in creating a user :: User Controller Error", error);
        return;
      }
    } else {
      alert("User already exist");
      return res.redirect("back");
    }
  } catch (error) {
    console.log("Error in finding the user::User Controller Error", error);
    return;
  }
};

//Sign In and Create a Session
module.exports.createSession = function (req, res) {
  req.flash("success", "Logged in Successfully");
  return res.redirect("/");
};
//Destroy session

module.exports.destroySession = function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "User Logged out");

    return res.redirect("/users/sign-in");
  });
};
