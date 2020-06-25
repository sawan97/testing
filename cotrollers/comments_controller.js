const Comment = require('../models/comment');
const Post  = require('../models/post');


module.exports.create = function(req,res){
    Post.findById(req.body.post, function(err, post){
        // console.log(post.comments);
                if(post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function(err,comment){
                //handle error

                post.comments.push(comment);
                post.save();

                res.redirect('/');
            });
        }
    });
}