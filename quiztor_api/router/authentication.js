const express = require("express");
const router = express.Router();
const { JWT_SECRET_KEY } = require("../config")
const jwt = require("jsonwebtoken");
const UserModel = require("../schema/user")

router.post("/login", (req, res) => {
    const body = req.body;


    UserModel.findOne({ username : body.username, password : body.password}, (err, user) => {
        if(err) {
            return res.json({
                status : "ERROR",
                message : "Invalid user"
            })
        }

        if(user == null) {
            return res.json({
                status : "ERROR",
                message : "Invalid user"
            })
        }
        else {
            const payload = JSON.stringify( { name : body.username, id : user._id, admin : user.admin})
            const jwtToken = jwt.sign(payload, JWT_SECRET_KEY)
            res.json({
                status : "SUCCESS",
                message : "User successfully logged in.",
                token : jwtToken,
                admin : user.admin
            })
        }
        
    });
});

module.exports = router;