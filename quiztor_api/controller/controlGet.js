const PostModel = require("../schema/post");
const CommentModel = require("../schema/comment");

module.exports.users = (req, res) => {
    UserModel.find((error, data) => {
        res.json(data);
    });
}

module.exports.posts = (req, res) => {
    PostModel.find((error, data) => {
        res.json(data);
    })
}

module.exports.comment_postid = (req, res) => {
    const id = req.params.postid;

    PostModel.findOne({ _id : id }, (error, data) => {
        if(error) {
            res.json({ status : "ERROR", message : "Unable to locate post"})
        }

        res.json(data)
    })
}

module.exports.comments_postid = (req, res) => {
    const id = req.params.postid

    CommentModel.find({post_id : id}, (error, data) => {
        if(error) {
            res.json({ status : "ERROR", message : "Unable to locate news"})
        }

        res.json(data)
    })
}