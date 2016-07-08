var express = require("express"),
    app     = express();

//requiring routes
var indexRoutes = require("./routes/index");

app.set("view engine", "ejs");
app.use(express.static('public'));

app.use("/", indexRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Dungeon Man server has started");
});