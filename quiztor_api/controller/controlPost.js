const PostModel = require('../schema/post');
const UserModel = require('../schema/user')
const { PythonShell } = require('python-shell');
const mongoose = require('mongoose');
const fs = require("fs");
const { JWT_SECRET_KEY } = require("../config");
const jwt = require("jsonwebtoken");
const path = require("path");



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
    const image_text = '';
    const image_label = '';
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