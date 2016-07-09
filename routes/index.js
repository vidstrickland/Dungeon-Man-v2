var express = require("express");
var router = express.Router();

//Root Route
router.get("/", function(req, res){
    res.render("landing");
});

router.get("/login", function (req, res){
    res.render("login");
});

module.exports = router;