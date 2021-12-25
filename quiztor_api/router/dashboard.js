const express = require("express");
const AuthenticateToken = require("../utils/authentication");
const router = express.Router();
const fileMulterPublic = require('./fileMulterPublic');
const fileMulterTmpDir = require('./fileMulterTmpDir');
const controllerGetReq = require('../controller/controlGet');
const controllerPostReq = require('../controller/controlPost');


router.get("/posts", AuthenticateToken, controllerGetReq.posts);

router.get("/comments/:postid", controllerGetReq.comments_postid);

router.get("/post/:postid", controllerGetReq.comment_postid);



router.post("/posts", fileMulterPublic.single('meme'), controllerPostReq.posts);

router.post("/showQuery" , fileMulterTmpDir.single('meme'),AuthenticateToken, controllerPostReq.showQuery);

router.post("/comment/:postid", controllerPostReq.comment_postid);

module.exports = router;