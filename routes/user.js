const express = require("express");
const router = express.Router();
const User = require("../models/user"); 
const wrapAsync = require("../utils/wrapAsync");
const passport=require("passport");
const { saveRedirectUrl } = require("../middleware");
const userController=require("../controllers/user");

//Singup Route
router.route("/signup")
.get(userController.renderSignup)
.post(wrapAsync(userController.Signup));


//Login Route
router.route("/login")
.get( userController.renderLoginForm)
.post(saveRedirectUrl,
  passport.authenticate('local', { failureRedirect: '/login', failureFlash:true,}),
  userController.Login
);


router.get("/logout",userController.Logout)

module.exports = router;
