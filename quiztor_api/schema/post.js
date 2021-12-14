const mongoose = require("mongoose");
const natural = require('natural');
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
PostModel.createIndexes({label:"text"});
let userData = {};
userData.searchText = "world is burning";

// PostModel.find({label : {$regex: userData.searchText, $options:"i"}},(err, data) => {
//     console.log(data);
// });
// PostModel.find({label : {$regex: new RegExp(userData.searchText), $options:"i"}},(err, data) => {
//     console.log(data);
// });

module.exports = PostModel;