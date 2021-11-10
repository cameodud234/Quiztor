const express = require("express");
const router = express.Router();
const UserModel = require("../schema/user");
const AuthenticateAdmin = require("../utils/admin-auth");

router.get("/users", AuthenticateAdmin, (req, res) => {
    UserModel.find((error, data) => {
        res.json(data);
    })
})

router.post("/users", AuthenticateAdmin, (req, res) => {
    const body = req.body;

    if(body.username && body.username != "") {
        const user = new UserModel(body)
        user.save((error) => {
            if(error) {
                res.send({ status : "ERROR", message : "Unable to store user"})
            }
            res.send({ status : "SUCCESS", mesage : "User successfully added"})
        })
    } else {
        res.send({ 
            status : "ERROR", message : "Username not specified"
        })
    }
})

router.post("/nonadmin_users", (req, res) => {
    const body = req.body;

    if(body.username && body.username != "") {
        const user = new UserModel(body)
        user.save((error) => {
            if(error) {
                res.send({ status : "ERROR", message : "Unable to store user"})
            }
            res.send({ status : "SUCCESS", mesage : "User successfully added"})
        })
    } else {
        res.send({ 
            status : "ERROR", message : "Username not specified"
        })
    }
})

module.exports = router;