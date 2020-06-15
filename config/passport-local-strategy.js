const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

// Authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
    },
    function(email,password,done){
        //find a user and establish the identity
        User.findOne({email:email}, function(err,user){
            if(err){
                console.log('Error in finding user -->passport');
                return done(err);
            }

            if(!user || user.password!=password){
                console.log('Invalid Username/Password');
                return done(null,false);
            }
            return done(null,user);
        });
    }
));

//serialising the user to define which Keys to be kept in cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});

//deserialisg the user from the key in cookie
passport.deserializeUser(function(id,done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user -->passport');
            return done(err);
        }
        return done(null,user);      
    });
});

//check if the user is authenticated
passport.checkAuthentication = function(req,res,next){
    //if user is signed in then pass on the request to the next function i.e.controller's action
    if(req.isAuthenticated()){
        return next();
    }
    //if user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie and we are just sending this to the locals for views
        res.locals.user = req.user;
    }
    next();
}


module.exports = passport;