
// This middleware checks if an user is connected
const isConnected = (req, res, next) => {
    if(req.session.userid){
        next()
    }else{
        res.send('ERROR: You must be an connected')
    }
}

// Check if username exists
const isExistingUser = (req, res, next) => {
    const Models = require('../models');
    Models.Account.find({username : req.body.username.toLowerCase()}, (err, user) => {
        // check error
        if (err) throw err;
        
        if(user.length !== 0){
            res.send('ERROR: Username is already taken');
        }else{
            next();
        }
    });
}

// Check if email exists
const isExistingEmail = (req, res, next) => {
    const Models = require('../models');
    Models.Account.find({email : req.body.email}, (err, user) =>{
        // check error
        if (err) throw err;
        
        if(user.length !== 0){
            res.send('ERROR: Email is already taken');
        }else{
            next();
        }
    });
}

  module.exports.isConnected = isConnected;
  module.exports.isExistingUser = isExistingUser;
  module.exports.isExistingEmail = isExistingEmail;

