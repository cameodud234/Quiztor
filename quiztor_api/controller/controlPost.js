const PostModel = require('../schema/post');
const UserModel = require('../schema/user');
const CommentModel = require("../schema/comment");
const { PythonShell } = require('python-shell');
const mongoose = require('mongoose');
const fs = require("fs");
const { JWT_SECRET_KEY } = require("../config");
const jwt = require("jsonwebtoken");
// const path = require("path");


module.exports.users = (req, res) => {
    const body = req.body;

    if(body.username && body.password != "") {
        const user = new UserModel(body);
        user.save((error) => {
            if(error) {
                res.send({ status : "ERROR", message : "Unable to store user"})
            }
            res.send({ status : "SUCCESS", mesage : "User successfully added"})
        });
    } else {
        res.send({ 
            status : "ERROR", message : "Username not specified"
        });
    }
}

module.exports.nonadmin_users = (req, res) => {
    const body = req.body;

    if(body.username && body.username != "") {
        const user = new UserModel(body)
        user.save((error) => {
            if(error) {
                res.send({ status : "ERROR", message : "Unable to store user"})
            }
            res.send({ status : "SUCCESS", mesage : "User successfully added"})
        });
    } else {
        res.send({ 
            status : "ERROR", message : "Username not specified"
        });
    }
}

module.exports.login = (req, res) => {
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
};

module.exports.posts = (req, res, next) => {
    let image_text = '';
    let image_label = '';
    const body = req.query;
    const url = req.protocol + '://' + req.get('host');

    id = new mongoose.Types.ObjectId();

    const pathToFile = 'public/' + req.file.filename;
    const newPathToFile = 'public/' + id + '-' + req.file.filename;

    fs.renameSync(pathToFile, newPathToFile, function (err) {
        if (err) {
            throw err;
        } else {
            console.log("Successfully renamed the file!");
        }
    })

    let options = {
        mode: 'text',
        pythonOptions: ['-u'], // get print results in real-time
        scriptPath: 'python',
        args: [newPathToFile]
    };

    PythonShell.run('text_extract.py', options, function (err, result) {
        if (err) throw err;
        // result is an array consisting of messages collected
        //during execution of script.
        image_text = result[0]

        PythonShell.run('main.py', options, function (err, result) {
            if (err) throw err;
            // result is an array consisting of messages collected
            //during execution of script.
            //console.log(options)
            image_label = result[0]

            PostModel.find({label : {$regex: new RegExp(image_label)}},(err, data) => {
                for(let i in data){
                    
                    if (data[i].meme_text === image_text){

                        fs.unlink(newPathToFile, (err) => {
                            if (err) {
                                res.status(500).json({
                                    error: err
                                });
                            }
                            //file removed
                        })
                        
                        res.status(400).json({
                            error:"Meme is already uploaded"
                        });

                    }

                }
            });

            const post = new PostModel({
                _id: id,
                label: image_label,
                meme_text: image_text,
                description: body['description'],
                title: body['title'],
                meme: url + '/' + id + '-' + req.file.filename
            });
    
            post.save().then(result => {
                console.log(result);
                res.status(201).json({
                    message: "Done upload!",
                    postCreated: {
                        _id: result._id,
                        label: body['label'],
                        meme_text: body['meme_text'],
                        description: body['description'],
                        title: body['title'],
                        meme: result.meme
                    }
                })
            }).catch(err => {
                console.log(err),
                    res.status(500).json({
                        error: err
                    });
            })
        });
    });
};

module.exports.comment_postid = (req, res) => {
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
}