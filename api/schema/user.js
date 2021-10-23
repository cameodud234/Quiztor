const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// tokens for authentication purposes
const userSchema = new Schema({
    username : {type: String, unique: true},
    password : String,
    token: String,
});

// This will be the updated schema the mongoose database

// const userSchema = new Schema({
//     username : { type: String, unique: true},
//     email: {type: String, unique: true},
//     password : String,
//     age : Number,
//     profilePhoto : native file link,
//     othercrap... ,
//     .. ,
// })

const UserModel = mongoose.model("user", userSchema, "users");

module.exports = UserModel;