const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

// FOR TESTING PURPOSES!!!
router.get("/showPosts", authController.showPosts_get);

router.post("/post", authController.post_post);

router.get("/post", authController.post_get);

router.get("/showQuery", authController.showQuery_post);

module.exports = router;