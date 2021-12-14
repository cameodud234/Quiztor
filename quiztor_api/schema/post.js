const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    // userid : String,
    // username : String,
    label : String,
    meme_text : String,
    description : String,
    title : String,
    meme : String
});

const PostModel = mongoose.model("post", postSchema, "posts");
// PostModel.createIndexes({label:"text", meme_text:"text"});

module.exports = PostModel;