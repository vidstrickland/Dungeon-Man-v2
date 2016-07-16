var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//Root Route
router.get("/", function(req, res){
    res.render("landing");
});

//show login form
router.get("/login", function (req, res){
    res.render("login");
});

//login logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/", 
        failureRedirect: "/login"
    }), function(req, res){
});

//show registration form
router.get("/register", function(req, res){
   res.render("register");
});

//registration logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/register");
        })
    })
})

//logout route
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

module.exports = router;