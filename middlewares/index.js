// This middleware checks if an user is connected
const authorizeUsersAccess = (req, res, next) => {
    if(req.session.userid){
        next()
    }else{
        res.send('ERROR: You must be an connected')
    }
  }

  module.exports.authorizeUsersAccess = authorizeUsersAccess;

