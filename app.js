var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var littlelibraries = [
    {name: "Martha Crites", image: "https://littlefreelibrary.secure.force.com/servlet/servlet.FileDownload?file=00Pd000000L5iAaEAJ"},
    {name: "Little Purple", image: "https://littlefreelibrary.secure.force.com/servlet/servlet.FileDownload?file=00P0W000019NKZAUA4"},
    {name: "Joseph Tartakoff", image: "https://littlefreelibrary.secure.force.com/servlet/servlet.FileDownload?file=00Pd000000IivU9EAJ"}
];

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");




app.get("/", function(req, res){
    res.render("landing")
});

app.get("/littlelibraries", function(req, res){
    

    res.render("littlelibraries", {littlelibraries: littlelibraries});
});

app.post("/littlelibraries", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var newLittleLibrary = {name: name, image: image};
    littlelibraries.push(newLittleLibrary);
    res.redirect("/littlelibraries");
});

app.get("/littlelibraries/new", function(req, res){
    res.render("new");
});

app.listen(3000, function(){
    console.log("Server on port 3000");
});
