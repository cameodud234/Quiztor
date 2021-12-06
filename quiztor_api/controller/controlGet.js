const PostModel = require("../schema/post");

module.exports.posts = (req, res) => {
    PostModel.find((error, data) => {
        res.json(data);
    })
}

module.exports.showQuery = async (req, res, next) => {
    const userData = req.query;
    await PostModel.find({label : {$regex: new RegExp(userData.searchText)}},(err, data) => {
        res.json(data);
    });
}