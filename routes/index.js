var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware");
var timer = require("../public/scripts/timer");
var DPCost = require("../models/dpCost");
var mongoose        = require("mongoose");

var currentTime = 0;

//Root Route
router.get("/", function(req, res){
    DPCost.find({},{},function(err, currentDPCost){
        res.render("landing", {
            "currentDPCost" : currentDPCost
        });    
    });
    //console.log("CLOCK COUNT: " + timer.currentClock());
});

//About Route
router.get("/about", function(req, res){
    DPCost.find({},{},function(err, currentDPCost){
        res.render("about", {
            "currentDPCost" : currentDPCost
        });    
    });
    //console.log("CLOCK COUNT: " + timer.currentClock());
});

//show login form
router.get("/login", function (req, res){
    res.render("login");
});

//login logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/", 
        failureRedirect: "/login",
    }), function(req, res){
});

//show registration form
router.get("/register", function(req, res){
   res.render("register");
});

//show patch notes page
router.get("/patchnotes", function(req, res){
   res.render("patchnotes");
});

//show admin tools
router.get("/admin", function(req, res){
    var newDPCost = new DPCost({currentDPCost: 0});
    DPCost.find({},{},function(err, currentDPCost){
        res.render("admin", {
            "currentDPCost" : currentDPCost
        });    
    });
    
});

//admin logic
router.post("/admin", function(req, res){
    var newDPCost = new DPCost({currentDPCost: req.body.dpcost});
    DPCost.update({currentDPCost: req.body.dpcost});
    newDPCost.save();
   console.log(req.body.dpcost);
   res.redirect("/admin");
});

//registration logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            req.flash("error", err.message);
            res.redirect("/register");
        }else{
        user.time = 0;
        user.save(function(err){
                if(err){
                    console.log(err);
                }
            })
        passport.authenticate("local")(req, res, function(){
            res.redirect("/");
        })
        }
    })
})

//logout route
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

//save game route
router.get("/save", middleware.isLoggedIn, function(req, res){
    console.log(req.user.username);
    User.findOne({username:req.user.username}, function(err, user){
        if(err){
            console.log(err);
        }else{
            user.time += timer.currentClock();
            console.log("Current Time: " + timer.currentClock());
            console.log("Total Time: " + user.time);
            user.save(function(err){
                if(err){
                    console.log(err);
                }
            })
    }
    res.redirect("/");
    })
});

//Special Offer Route
router.get("/specialoffer", function(req, res){
    DPCost.find({},{},function(err, currentDPCost){
        res.render("specialoffer", {
            "currentDPCost" : currentDPCost
        });    
    });
    //console.log("CLOCK COUNT: " + timer.currentClock());
});

module.exports = router;
exports.time = currentTime;