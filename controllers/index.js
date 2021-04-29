
// ##########################
// if req.session.userid 
// true --> user is connected
// false --> user is not connected
// ##########################


// sign up a new person
const signUpPerson = (req, res) => {
    const crypto = require('crypto');
    let pass = crypto.createHash('md5').update(req.body.pass).digest("hex");
    const Models = require('../models');
    const newAccount = Models.Account ({
        username: req.body.username,
        password : pass,
        email : req.body.email
    });
    newAccount.save(function(err) {
        if (err) throw err;
        res.end('done');
    });
}

// log in a person
// return JWT
const logInPerson = (req, res) => {
    const crypto = require('crypto');
    let pass = crypto.createHash('md5').update(req.body.pass).digest("hex");
    const Models = require('../models');
    //Find user's username and password
    Models.Account.find({username : req.body.username.toLowerCase(), password : pass},(err,result) => {
        if (err) throw err;
        if (result.length == 1) {
            //req.session.username = req.body.username;
            req.session.userid = result[0]._id;
            res.json({token : result[0].token, id : result[0]._id,username:result[0].username});
        } else {
            res.json('error');
        }
    });
}

// Log Out
const logOut = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return console.log(err);
        }
        res.end('done');
    });
}

// Check if username exists
const getUsername = (req, res) => {
    const Models = require('../models');
    Models.Account.find({username : req.params.username}, (err, username) => {
        if (err) throw err;
        res.json(username);
    });
}

// find email
const getEMail = (req, res) => {
    const Models = require('../models');
    Models.Account.find({email : req.params.email}, (err, email) =>{
        if (err) throw err;
        res.json(email);
    });
}

// check if a user is connected
const isConnected = (req,res) => {
    if(req.session.userid){
        res.json({res:true});
    }else{
        res.json({res:false});
    }
}



// export function

module.exports.signUpPerson = signUpPerson;
module.exports.logInPerson = logInPerson;
module.exports.logOut = logOut;
module.exports.getEMail =getEMail;
module.exports.getUsername = getUsername;
module.exports.isConnected = isConnected;