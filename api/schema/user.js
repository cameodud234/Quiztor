const mongoose = require('mongoose');
const {isEmail} = require('validator');
const Schema = mongoose.Schema;

// tokens for authentication purposes
const userSchema = new Schema({
    username : {
        type: String, 
        required: [true, 'Please enter a username'] ,
        unique: true
    },
    email: {
        type: String, 
        lowercase: true,
        validator: [isEmail, 'Please enter a valid email']
    },
    password : {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [2, 'Minimum password length is 2 characters']
    },
    token : {
        type: String
    },
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

const UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;