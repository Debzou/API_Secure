
const crypto = require('crypto');
const Models = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();


// This function generate a tokenUser
function generateAccessToken(username) {
    return jwt.sign(username, process.env.API_TOKEN, { expiresIn: '1800s' });
}

// sign up a new person
const signUpPerson = (req, res) => {

    // use the sha256 to secure the password in database
    const password = crypto.createHash('sha256').update(req.body.password).digest("hex");

    // create the model
    
    const newAccount = Models.Account ({
        username: req.body.username.toLowerCase(),
        password : password,
        email : req.body.email
    });

    // save the model
    newAccount.save(function(err) {
        if (err) throw err;
        res.end('done');
    });
}

// log in a person
// return JWT
const logInPerson = (req, res) => {
    // parse login and password from headers
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');

    // hash password
    let passwordToCheck = crypto.createHash('sha256').update(password).digest("hex");

    //Find user's username and password
    Models.Account.find({username : login.toLowerCase(), password : passwordToCheck},(err,result) => {
        if (err) throw err;
        // user exists
        if (result.length == 1) {
            const token = generateAccessToken({ username: result[0]._id });
            res.json({token : token, id : result[0]._id,username:result[0].username});

        //
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


// check if a user is connected
const proveAnthentication = (req,res) => {
    res.json({response:"You are authenticate"});
}

// export function

// API controllers
module.exports.signUpPerson = signUpPerson;
module.exports.logInPerson = logInPerson;
module.exports.logOut = logOut;
module.exports.proveAnthentication = proveAnthentication;

