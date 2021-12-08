const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_id : String,
    username : String,
    post_id : String,
    comment : String,
});

const CommentModel = mongoose.model("comment", commentSchema, "comments");

module.exports = CommentModel;