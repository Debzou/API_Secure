const router = require('express').Router();
const controller = require('../controllers');
const middleware = require('../middlewares');

// Sign up page
router.post('/signup',(req,res)=>{
    controller.signUpPerson(req,res);
});

// Log in page
router.post('/login',(req,res)=>{
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

// Protected route : middleware checks if an user is connected
router.get('/api/username/:username',middleware.authorizeUsersAccess,(req,res)=>{
    controller.getUsername(req,res);
});

// Protected route : middleware checks if an user is connected
router.get('/api/email/:email',middleware.authorizeUsersAccess,(req,res)=>{
    controller.getEMail(req,res);
});

// Hello world
router.get('/',(req,res)=>{
    res.end("welcome in API")
});


module.exports=router;