var express = require("express");
var router = express.Router();
var Littlelibrary = require("../models/littlelibrary");


//INDEX
router.get("/littlelibraries", function(req, res){
    
    Littlelibrary.find({}, function(err, allLittlelibraries){
        if(err){
            console.log(err);
        } else {
            res.render("littlelibraries/index", {littlelibraries: allLittlelibraries, currentUser: req.user});
        }
    })

});

//CREATE
router.post("/littlelibraries", isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newLittleLibrary = {name: name, image: image, description: desc, author: author};
    Littlelibrary.create(newLittleLibrary, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/littlelibraries");
        }
    });
    
});


//NEW
router.get("/littlelibraries/new", isLoggedIn, function(req, res){
    res.render("littlelibraries/new");
});

//SHOW
router.get("/littlelibraries/:id", function(req, res){
    Littlelibrary.findById(req.params.id).populate("comments").exec(function(err, foundLittlelibrary){
        if(err){
            console.log(err);
        } else {
            console.log(foundLittlelibrary);
            res.render("littlelibraries/show", {littlelibrary: foundLittlelibrary});
        }
    });
});

//middleware

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
    
};

module.exports = router;