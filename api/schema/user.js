const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username : String,
    password : String,
    // firstName : String,
    // lastName : String,
    // age : Number,
    // profilePhoto : native file link
})

const UserModel = mongoose.model("user", userSchema, "users");

module.exports = UserModel;