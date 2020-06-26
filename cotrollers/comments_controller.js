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

module.exports.destroy = function(req,res){
    Comment.findById(req.params.id,function(err,comment){
        if(comment.user == req.user.id){
            //get the post id in which post the comments has created
            let postId = comment.post;

            comment.remove();
            
            //find the post and pull out the comment id from the array of comments inside that post
            Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}}, function(err,post){
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }
    });
}   



