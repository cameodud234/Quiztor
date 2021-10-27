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

// userSchema.pre('save', function(next) {
//     console.log('user about to be created and saved',this);
//     next();
// })

// userSchema.post('save', function(doc, next) {
//     console.log('new user was created and saved', doc);
//     next();
// });

const UserModel = mongoose.model("user", userSchema, "users");

module.exports = UserModel;