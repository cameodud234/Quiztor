const express = require("express");
const router = express.Router();
const PostModel = require("../schema/post");
const AuthenticateToken = require("../utils/authentication");

router.get("/posts", AuthenticateToken, (req, res) => {
    PostModel.find((error, data) => {
        res.json(data);
    })
})

router.post("/posts", (req, res) => {
    const body = req.body;

    if(body.name && body.name != "") {
        const post = new PostModel(body)
        post.save((error) => {
            if(error) {
                res.send({ status : "ERROR", message : "Unable to store post"})
            }
            res.send({ status : "SUCCESS", mesage : "Post successfully added"})
        })
    } else {
        res.send({
            status : "ERROR", message : "Name not specified"
        })
    }
})

module.exports = router;