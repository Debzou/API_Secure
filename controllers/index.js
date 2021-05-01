
// Libray for hash password
const crypto = require('crypto');

const Models = require('../models');

// Libray for create and verify token
const jwt = require('jsonwebtoken');

// Add env
require('dotenv').config();

/** 
 * @return jwt genreate with userId and API-KEY
 */
function generateAccessToken(username) {
    return jwt.sign(username, process.env.API_TOKEN, { expiresIn: process.env.TIME_JWT });
}


/** 
 * Add a new Account in mongoDB
 * @model : Acoount
 * @res : end('done')
 */
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


/** 
 * Check if Account exists in mongoDB
 * @model : Acoount
 * @res : json {token, id, username}
 */
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

        } else {
            res.json('error');
        }
    });
}


/** 
 * Check if Account exists in mongoDB
 * @res : json {response:"You are authenticated"}
 */
const proveAnthentication = (req,res) => {
    res.json({response:"You are authenticated"});
}

// export function
// API controllers
module.exports.signUpPerson = signUpPerson;
module.exports.logInPerson = logInPerson;
module.exports.proveAnthentication = proveAnthentication;

