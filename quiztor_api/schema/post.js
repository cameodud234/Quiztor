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
PostModel.createIndexes({label:"text"});

// let searchString = 'car_salesman_meme';

// PostModel.find({$text: {$search: searchString}}, (err, res) => {
//     if(err) console.err.log(err);
//     console.log(res);
// });


module.exports = PostModel;