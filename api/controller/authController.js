const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../schema/user');
const PostModel = require('../schema/post');


// FOR TESTING PURPOSES!!!
module.exports.showUsers_get = (req, res, next) => {
    UserModel.find((err, data) => {
        res.json(data);
        console.log(data);
    });
}

// FOR TESTING PURPOSES!!!
module.exports.showPosts_get = (req, res, next) => {
    PostModel.find((err, data) => {
        res.json(data);
        console.log(data);
    });
}


module.exports.showQuery_post = async (req, res, next) => {
    let userData = req.query;
    await PostModel.find({classifier: {$regex: new RegExp(userData.searchText)}},(err, data) => {
        res.json(data);
        console.log(data);
    });
}


module.exports.authHome_post = (req, res, next) => {
    try {
        res.send({status: "200", message: "Welcome fellow user"});
    } catch (err) {
        next(err);
    }
}

module.exports.signup_post = async (req, res, next) => {
    const body = req.body;

    try{
        if(body.username !== "" && body.password !== "" && body.email !== "") {
            const oldUser = await UserModel.findOne({username: body.username});
            if(oldUser){
                return res.send({status: "Error", message: "User Already exists. Please login..."});
            }
            encryptPW = await bcrypt.hash(body.password, 10);
            const user = await UserModel.create({
                username: body.username,
                email: body.email,
                password: encryptPW,
            });

            const token = jwt.sign(
                {user_id: body.username},
                process.env.JWT_KEY,
                {
                    expiresIn: "2h",
                }
            );

            user.token = token;

            user.save((error) => {
                if(error) {
                    res.send({ status : "ERROR", message : "Unable to store user"});
                }
                res.send({ status : "SUCCESS", mesage : "User successfully added"});
            });
        } else {
            res.send({ 
                status : "ERROR", message : "Username, email, or password not specified"
            });
        }
    } catch(err){
        next(err);
    }

}

module.exports.login_post = async (req, res, next) => {
    // some crap here
}

module.exports.login_get = async (req, res, next) => {
    try {
        const body = req.body;
        if(body.username === ""|| body.email === "" || body.password === ""){
            res.send({status: "ERROR", message: "All input is required"});
        }

        const user = await UserModel.findOne({username: body.username});
        if(user){
            const comparePW = await bcrypt.compare(body.password, user.password);
            if(comparePW){
                const token = jwt.sign(
                    {user_id: body.username},
                    process.env.JWT_KEY,
                    {
                        expiresIn: "2h",
                    }
                );
                user.token = token;
    
                res.send({status: "SUCCESS", message: "User successfully found"})
            }
            else{
                res.send({status: "ERROR", message: "Invalid credentials"});
            }
        }
        else{
            res.send({status: "ERROR", message: "User not in system"});
        }
        
    
    } catch (err) {
        next(err);
    }
}


module.exports.post_post = async (req, res, next) => {
    const body = req.body;

    try{
        if(body.classifier !== "" && body.meme_text !== "" && 
                body.description !== "" && body.title !== "") {
            const user = new PostModel(body);
            user.save((error) => {
                if(error) {
                    res.send({ status : "ERROR", message : "Unable to store user"});
                }
                res.send({ status : "SUCCESS", mesage : "User successfully added"});
            });
        } else {
            res.send({ 
                status : "ERROR", message : "One field not specified"
            });
        }
    } catch(err){
        next(err);
    }
}

module.exports.post_get = async (req, res, next) => {
    const body = req.body;

    try {
        if(body.classifier === "" || body.meme_text === "" || 
        body.description === "" || body.title === "") {
            res.send({status: "ERROR", message: "All input is required"});
        }

        const user = await UserModel.findOne({username: body.username});
        if(user){
            const comparePW = await bcrypt.compare(body.password, user.password);
            if(comparePW){
                const token = jwt.sign(
                    {user_id: body.username},
                    process.env.JWT_KEY,
                    {
                        expiresIn: "2h",
                    }
                );
                user.token = token;
    
                res.send({status: "SUCCESS", message: "User successfully found"})
            }
            else{
                res.send({status: "ERROR", message: "Invalid credentials"});
            }
        }
        else{
            res.send({status: "ERROR", message: "User not in system"});
        }
        
    
    } catch (err) {
        next(err);
    }

}