const express = require('express');
const router = express.Router();
const authentication = require('../middleware/authentication');
const authController = require('../controller/authController');

// FOR TESTING PURPOSES!!!
router.get("/showUsers", authController.showUsers_get);

router.get("/login", authController.login_get);

router.post("/login", authController.login_post);

router.post("/signup", authController.signup_post);



router.post("/welcome", authController.authHome_post);
// adding the middleware "authentication" breaks this post req.
// router.post("/welcome", authentication, authController.authHome_post);

module.exports = router;