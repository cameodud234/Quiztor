const express = require("express");
const AuthenticateToken = require("../utils/authentication");
const router = express.Router();
const fileMulter = require('./fileMulter');
const controllerGetReq = require('../controller/controlGet');
const controllerPostReq = require('../controller/controlPost');
const PostModel = require("../schema/post");
const CommentModel = require("../schema/comment");
const { JWT_SECRET_KEY } = require("../config");
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

router.get("/posts", AuthenticateToken, controllerGetReq.posts);

router.get("/showQuery", AuthenticateToken, controllerGetReq.showQuery);

router.post("/posts", fileMulter.single('meme'), controllerPostReq.posts);

router.get("/post/:postid", (req, res) => {
    const id = req.params.postid;

    PostModel.findOne({ _id : id }, (error, data) => {
        if(error) {
            res.json({ status : "ERROR", message : "Unable to locate post"})
        }

        res.json(data)
    })
})

router.post("/comment/:postid", (req, res) => {
    id = new mongoose.Types.ObjectId();
    token = req.headers['authorization']
    username = null;
    user_id = null;
    comment = null;

    if(token && token !== ""){
        jwt.verify(token, JWT_SECRET_KEY, (err, decoded)=> {
            if(err) {
                return res.json({ status : "ERROR", message : "Invalid User" })
            }

            username = decoded.name
            user_id = decoded.id
            post_id = req.params.postid
            user_comment = req.body.comment

            const comment = new CommentModel({
                _id : id,
                user_id : user_id,
                username : username,
                post_id : post_id,
                comment : user_comment
            })

            comment.save().then(result => {
                console.log(result);
                res.status(201).json({
                    message: "Done upload!",
                    commentCreated: {
                        _id : result.id,
                        user_id : result.user_id,
                        username : result.username,
                        post_id : result.post_id,
                        comment : result.comment
                    }
                })
            }).catch(err => {
                console.log(err),
                res.status(500).json({
                    error : err
                })
            })
        })
    }
})

router.get("/comments/:postid", (req, res) => {
    const id = req.params.postid

    CommentModel.find({post_id : id}, (error, data) => {
        if(error) {
            res.json({ status : "ERROR", message : "Unable to locate news"})
        }

        res.json(data)
    })
})

module.exports = router;