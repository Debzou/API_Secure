
// ##########################
// if req.session.userid 
// true --> user is connected
// false --> user is not connected
// ##########################
const crypto = require('crypto');

// sign up a new person
const signUpPerson = (req, res) => {

    // use the sha256 to secure the password in database
    const password = crypto.createHash('sha256').update(req.body.password).digest("hex");

    // create the model
    const Models = require('../models');
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
    const Models = require('../models');

    //Find user's username and password
    Models.Account.find({username : login.toLowerCase(), password : passwordToCheck},(err,result) => {
        if (err) throw err;
        // user exists
        if (result.length == 1) {
            req.session.userid = result[0]._id;
            res.json({token : result[0].token, id : result[0]._id,username:result[0].username});

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
module.exports.isConnected = isConnected;