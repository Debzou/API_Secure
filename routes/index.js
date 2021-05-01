const router = require('express').Router();
const controller = require('../controllers');
const middleware = require('../middlewares');

// Sign up page
router.post('/signup', middleware.isExistingUser,  middleware.isExistingEmail,  (req,res)=>{
    controller.signUpPerson(req,res);
});

// Basic auth http
// cf --> req.headers.authorization
router.get('/login',(req,res)=>{
    controller.logInPerson(req,res);
});

// Log Out
router.get('/logout-server',(req,res) => {
    controller.logOut(req, res);
});

// check if a user is connected
router.get('/proveAnthentication',middleware.authenticateToken,(req,res) => {
    controller.proveAnthentication(req, res);
});

// Hello world
router.get('/',(req,res)=>{
    res.end("welcome in API")
});


module.exports=router;