var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    flash           = require("connect-flash"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    User            = require("./models/user"),
    dpCost          = require("./models/dpCost"),
    methodOverride  = require("method-override"),
    timer           = require("./public/scripts/timer");

//requiring routes
var indexRoutes = require("./routes/index");

//database url
var url = process.env.DATABASEURL || "mongodb://localhost/dungeon_man"
mongoose.connect(url);

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"))
app.use(methodOverride("_method"));
app.use(flash());
app.locals.timer = timer;

//passport configuration
app.use(require("express-session")({
    secret: "You are inside of my body. ...Brick Road",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error =  req.flash("error");
    res.locals.success =  req.flash("success");
    next();
});


app.use("/", indexRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Dungeon Man server has started");
});