const User=require("../models/user.js");
module.exports.renderSignup=(req, res) => {
  res.render("users/signup.ejs");
};

module.exports.Signup=async (req, res, next) => {
  try{
      let { username, email, password,contact } = req.body;
     const newUser = new User({ email, username,contact });
     const registeredUser = await User.register(newUser, password);
     console.log(registeredUser);
     req.login(registeredUser,(err)=>{
      if(err){
        return next();
      }
      req.flash("success","Welcome to wanderlust");
      res.redirect("/listings");
     })
  } catch(e){
    req.flash("error",e.message);
    res.redirect("/signup");
  }
};

module.exports.renderLoginForm=(req, res) => {
  res.render('users/login.ejs');
};

module.exports.Login=async(req, res) => {
    req.flash("success","Welcome to WanderLust");
    let RedirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(RedirectUrl);
  };

module.exports.Logout=async(req,res,next)=>{
  req.logOut((err)=>{
    if(err){
      return next();
    }else{
      req.flash("success","you're Logout!");
      res.redirect("/listings");
    }
  })
}