const express = require("express");
const router = express.Router();
const ProductModel = require("../schema/product");
const AuthenticateToken = require("../utils/authentication");

router.get("/dashboard", AuthenticateToken, (req, res) => {
    ProductModel.find((error, data) => {
        res.json(data);
    })
})

router.post("/dashboard", (req, res) => {
    const body = req.body;

    if(body.name && body.name != "") {
        const product = new ProductModel(body)
        product.save((error) => {
            if(error) {
                res.send({ status : "ERROR", message : "Unable to store product"})
            }
            res.send({ status : "SUCCESS", mesage : "Product successfully added"})
        })
    } else {
        res.send({
            status : "ERROR", message : "Name not specified"
        })
    }
})

module.exports = router;