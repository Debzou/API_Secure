const router = require('express').Router();
const controller = require('../controllers');
const middleware = require('../middlewares');

// Sign up page
router.post('/signup', middleware.isExistingUser,  middleware.isExistingEmail,  (req,res)=>{
    controller.signUpPerson(req,res);
});

// Basic auth http
// cf --> req.headers.authorization
router.post('/login',middleware.checksession ,(req,res)=>{
    controller.logInPerson(req,res);
});

// Log Out
router.get('/logout-server',(req,res) => {
    controller.logOut(req, res);
});

// check if a user is connected
router.get('/isConnected',(req,res) => {
    controller.isConnected(req, res);
});

// Hello world
router.get('/',(req,res)=>{
    res.end("welcome in API")
});

// Views

// homePage
router.get('/homePage',(req,res)=>{
    controller.goToHome(req,res);
});

// Sign up page
router.get('/signupPage',(req,res)=>{
    controller.goToSignUp(req,res);
});

// Log in page
router.get('/loginPage',(req,res)=>{
    controller.goToLogIn(req,res);
});


module.exports=router;