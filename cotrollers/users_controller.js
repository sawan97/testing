const User = require('../models/user');
const Post = require('../models/post');

module.exports.home =function(req,res){
    return res.render('users',{
        title:"users"});
}
module.exports.profile = function(req,res){
    res.render('users',{
        title:"Profile",
        // user:User
    });
}
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    res.render('user_sign_up',{
        title:"signUp"
    });
}
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    res.render('user_sign_in',{
        title:"signIn"
    });
}

//get the sign up data
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email:req.body.email},function(err,user){
        if(err){console.log('error in finding user in signing up');
         return;
        }

        if(!user){
            User.create(req.body, function(err,user){
                if(err){console.log('error in creating user in signing up');
                return;
                }
                return res.redirect('/users/sign-in');
            });
        }else{
            return res.redirect('back');
        }
    });
}

//sign in and create a session for the user
module.exports.createSession = function(req,res){
    return res.redirect('/');
}

//sign OUT
module.exports.destroySession = function(req,res){
    req.logout();
    return res.redirect('/');
}
