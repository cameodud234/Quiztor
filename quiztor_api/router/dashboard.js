const express = require("express");
const AuthenticateToken = require("../utils/authentication");
const router = express.Router();
const fileMulter = require('./fileMulter');
const controllerGetReq = require('../controller/controlGet');
const controllerPostReq = require('../controller/controlPost');


router.get("/posts", AuthenticateToken, controllerGetReq.posts);

router.get("/showQuery", AuthenticateToken, controllerGetReq.showQuery);

router.post("/posts", fileMulter.single('meme'), controllerPostReq.posts);

module.exports = router;