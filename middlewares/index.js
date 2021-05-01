const jwt = require('jsonwebtoken');
const Models = require('../models');

const regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regexUsername = /^[a-zA-Z0-9]+$/

// Check if the user has a good token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.API_TOKEN, (err, user) => {
      if (err) return res.sendStatus(403)
      req.userID = user
      next()
    })
}

// Check if username exists and check regex
const isExistingUser = (req, res, next) => {
   
    // check regex
    if(regexUsername.test(req.body.username.toLowerCase())){  

        //Check if username exists
        Models.Account.find({username : req.body.username.toLowerCase()}, (err, user) => {
            // check error
            if (err) throw err;
            
            if(user.length !== 0){
                res.send('ERROR: Username is already taken');
            }else{
                next();
            }
        });

    }else{
        res.send('ERROR: Invalid regex for username');
    }
    
}

// Check if email exists
const isExistingEmail = (req, res, next) => {
    if(regexEmail.test(req.body.email)){ 
        Models.Account.find({email : req.body.email}, (err, user) =>{
            // check error
            if (err) throw err;
            
            if(user.length !== 0){
                res.send('ERROR: Email is already taken');
            }else{
                next();
            }
        });
    }else{
        res.send('ERROR: Invalid regex for email');
    }
}

const securingUsingASession = (req, res, next) => {
    if(req.session.username){
        next();
    }else{
        res.send('ERROR: Invalid session');
    }
}




module.exports.isExistingUser = isExistingUser;
module.exports.isExistingEmail = isExistingEmail;
module.exports.authenticateToken = authenticateToken;
module.exports.securingUsingASession = securingUsingASession;

