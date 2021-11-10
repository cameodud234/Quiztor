const jwt = require("jsonwebtoken")
const { JWT_SECRET_KEY } = require("../config")

function AuthenticateAdmin(req, res, next) {
    const token = req.headers['authorization']

    if(token && token !== ""){
        jwt.verify(token, JWT_SECRET_KEY, (err, decoded)=> {
            if(err) {
                return res.json({ status : "ERROR", message : "Invalid User" })
            }

            if(decoded.admin == true) {
                req.user = decoded
                next()
            }
        })
    }
    else {
        res.json({ status : "ERROR", message : "Invalid User"})
    }
}

module.exports = AuthenticateAdmin;