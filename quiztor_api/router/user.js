const express = require("express");
const router = express.Router();
const AuthenticateAdmin = require("../utils/admin-auth");
const controllerGetReq = require('../controller/controlGet');
const controllerPostReq = require('../controller/controlPost');

router.get("/users", AuthenticateAdmin, controllerGetReq.users);

router.post("/users", AuthenticateAdmin, controllerPostReq.users);

router.post("/nonadmin_users", controllerPostReq.nonadmin_users);

module.exports = router;