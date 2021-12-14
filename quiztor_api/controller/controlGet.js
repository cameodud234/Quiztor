const PostModel = require("../schema/post");

module.exports.posts = (req, res) => {
    PostModel.find((error, data) => {
        res.json(data);
    })
}

module.exports.showQuery = async (req, res, next) => {
    const userData = req.query;

    const {PythonShell} = require('python-shell');

    let options = {
        mode: 'text',
        //   pythonPath: '/opt/anaconda3/bin',
        pythonOptions: ['-u'], // get print results in real-time
        scriptPath: './python',
        args: [userData.searchText]
    };

    let lettersOnly = (str) => {
        return str.replace(/[^a-zA-Z]/g,"");
    }

    PythonShell.run('myScript.py', options, function (err, res_inner) {
        if (err) throw err;

        let syns = res_inner[0];
        let keywords = syns.substr(1,syns.length - 1);
        let keywordList = keywords.split(" ");
        keywordList.push(userData.searchText);

        for(let i in keywordList){
            keywordList[i] = lettersOnly(keywordList[i]);
        }

        let regex = keywordList.join("|");
        console.log(regex)

        PostModel.find({'$or':[{label:new RegExp(regex,'i')},{meme_text:new RegExp(regex,'i')}]}).exec(function(err, collection) {
            console.log(collection);
            res.json(collection);
        })

    });
}