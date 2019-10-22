const userQueries = require("../db/queries.users.js");
const passport = require("passport");
const {
  validationResult
} = require('express-validator');


module.exports = {
  signUpForm(req, res, next) {
    res.render("users/sign-up");
  },
  signInForm(req, res, next) {
    res.render("users/sign-in");
  },
  create(req, res, next) {
    console.log("Create called with " + req.body.name);
    let newUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    };
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("error", errors.array({
        onlyFirstError: true
      }));
      return res.redirect(303, req.headers.referer)
    }
    userQueries.createUser(newUser, (err, user) => {
      if (err) {
        req.flash("error", err);
        res.redirect("/users/sign-up");
      } else {
        passport.authenticate("local")(req, res, () => {
          req.flash("notice", "You've successfully signed up!");
          res.redirect("/");
        })
      }
    });
  },
  signIn(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("error", errors.array({
        onlyFirstError: true
      }));
      return res.redirect(303, req.headers.referer)
    }
    passport.authenticate("local")(req, res, function () {
      if (!req.user) {
        req.flash("notice", "Sign in failed. Please try again.")
        res.redirect("/users/sign-in");
      } else {
        req.flash("notice", "You've successfully signed in!");
        res.redirect("/");
      }
    })
  },
  signOut(req, res, next){
    req.logout();
    req.flash("notice", "You've successfully signed out!");
    res.redirect("/");
  }

}