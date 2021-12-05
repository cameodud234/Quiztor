const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username : String,
    password : String,
    admin : Boolean
});

const UserModel = mongoose.model("user", userSchema, "users");

module.exports = UserModel;