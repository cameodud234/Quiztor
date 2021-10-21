const express = require("express");
const router = express.Router();
const UserModel = require("../schema/user");

router.get("/users", (req, res) => {
    UserModel.find((error, data) => {
        res.json(data);
        console.log(data);
    });
})

router.post("/users", async (req, res) => {
    const body = req.body;

    if(body.username && body.password != "") {
        const user = await UserModel.create(req.body);
        user.save((error) => {
            if(error) {
                res.send({ status : "ERROR", message : "Unable to store user"});
            }
            res.send({ status : "SUCCESS", mesage : "User successfully added"});
        });
    } else {
        res.send({ 
            status : "ERROR", message : "Username not specified"
        });
    }
})

module.exports = router;