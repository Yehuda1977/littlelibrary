//==========================
// COMMENT ROUTES
//==========================
var express = require("express");
var router = express.Router({mergeParams: true});
var Littlelibrary = require("../models/littlelibrary");
var Comment = require("../models/comment");




router.get("/littlelibraries/:id/comments/new", isLoggedIn, function(req, res){
    // find littlelibrary by id
    Littlelibrary.findById(req.params.id, function(err, littlelibrary){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {littlelibrary: littlelibrary}); 
        }
    });
    
});

router.post("/littlelibraries/:id/comments", isLoggedIn, function(req, res){
    // lookup library with ID
    Littlelibrary.findById(req.params.id, function(err, littlelibrary){
        if(err){
            console.log(err);
            res.redirect("/littlelibraries");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    
                    //save comment
                    comment.save();
                    littlelibrary.comments.push(comment);
                    littlelibrary.save();
                    res.redirect('/littlelibraries/' + littlelibrary._id);
                }
            })
        }
    })
    //create comment
    // connect to comment to library
    //redirect library to show page

});

//middleware

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
    
};

module.exports = router;