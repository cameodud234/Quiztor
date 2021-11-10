const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name : String,
    data : String,
    price : String
})

const ProductModel = mongoose.model("product", productSchema, "products");

module.exports = ProductModel;