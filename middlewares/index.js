const jwt = require('jsonwebtoken');
const Models = require('../models');

// Check if the user has a good token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.API_TOKEN, (err, user) => {
      if (err) return res.sendStatus(403)
      req.userID = userID
      next()
    })
}

// Check if username exists and check regex
const isExistingUser = (req, res, next) => {
   
    // check regex
    if(/^[a-zA-Z0-9]+$/.test(req.body.username.toLowerCase())){  

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




module.exports.isExistingUser = isExistingUser;
module.exports.isExistingEmail = isExistingEmail;
module.exports.authenticateToken = authenticateToken;

