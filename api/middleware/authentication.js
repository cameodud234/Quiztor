const jwt = require('jsonwebtoken');

const config = process.env;

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    if(!token){
        return res.send({status: 403, message: "A token is required for authentication"});
    }
    try {
        const decoded = jwt.verify(token, ocnfig.TOKEN_KEY);
        req.user = decoded;
    } catch (err) {
        next(err);
    }
}

module.exports = verifyToken;