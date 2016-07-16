var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    User            = require("./models/user"),
    methodOverride  = require("method-override");

//requiring routes
var indexRoutes = require("./routes/index");

//database url
var url = process.env.DATABASEURL || "mongodb://localhost/dungeon_man"
mongoose.connect(url);

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"))
app.use(methodOverride("_method"));

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

app.use("/", indexRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Dungeon Man server has started");
});