const express = require("express");
const router = express.Router();
const PostModel = require("../schema/post");
const AuthenticateToken = require("../utils/authentication");
const fs = require("fs")
const path = require("path")

const {PythonShell} =require('python-shell');

let multer = require('multer'),
    mongoose = require('mongoose');

const DIR = './public/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName)
    }
});

var upload = multer({
    storage: storage,
    // limits: {
    //   fileSize: 1024 * 1024 * 5
    // },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

router.get("/posts", AuthenticateToken, (req, res) => {
    PostModel.find((error, data) => {
        res.json(data);
    })



});

// router.get("/public/:image", (req, res) => {
//     const image = req.params.image;

    
// })
image_text = 'hello'
router.post("/posts", upload.single('meme'), (req, res, next) => {
    const body = req.query;
    const url = req.protocol + '://' + req.get('host')

    id = new mongoose.Types.ObjectId();

    const pathToFile = 'public/' + req.file.filename
    const newPathToFile = 'public/' + id + '-' + req.file.filename

    fs.renameSync(pathToFile, newPathToFile, function (err) {
        if (err) {
            throw err
        } else {
            console.log("Successfully renamed the file!")
        }
    })

    let options = {
        mode: 'text',
        pythonOptions: ['-u'], // get print results in real-time
        scriptPath: 'python',
        args : [newPathToFile]
    };

    PythonShell.run('text_extract.py', options, function (err, result){
        if (err) throw err;
        // result is an array consisting of messages collected
        //during execution of script.
        image_text = result[0]
        //console.log(result[0]);

        const post = new PostModel({
            _id: id,
            label: body['label'],
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



module.exports = router;