const express = require('express');
const controllerPostReq = require('../controller/controlPost');
const router = express.Router();

router.post("/login", controllerPostReq.login);

module.exports = router;