const jwt = require('jsonwebtoken');

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

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.API_TOKEN, (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    console.log(user);
    req.user = user
    next()
  })
}


module.exports.isExistingUser = isExistingUser;
module.exports.isExistingEmail = isExistingEmail;
module.exports.authenticateToken = authenticateToken;

