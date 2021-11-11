const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    classifier : String,
    meme_text : String,
    description : String,
    title : String
});

const PostModel = mongoose.model("post", postSchema, "posts");

module.exports = PostModel;