const router = require('express').Router();
const controller = require('../controllers');
const middleware = require('../middlewares');

/** 
 * Add new user
 * Check if user and email are already used
 * @route /signup
 * @get
 */
router.post('/signup', middleware.isExistingUser,  middleware.isExistingEmail,  (req,res)=>{
    controller.signUpPerson(req,res);
});

/** 
 * Basic Auth
 * @route /login
 * @get
 */
router.get('/login',(req,res)=>{
    controller.logInPerson(req,res);
});

/** 
 * Bearer Token
 * check if the token is validate
 * @route /proveAnthentication
 * @get
 */
router.get('/proveAnthentication',middleware.authenticateToken, middleware.securingUsingASession, (req,res) => {
    controller.proveAnthentication(req, res);
});

/** 
 * Hellworld
 * @route /
 * @get
 * @res : end("welcome in API")
 */
router.get('/',(req,res)=>{
    res.end("welcome in API")
});

/** 
 * Remove your session's value
 * @route logout
 * @get
 * 
 */
router.get('/logout',(req,res) => {
    controller.logOut(req, res);
});

// export module
module.exports=router;