const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("./db-connection")
const ProductRoutes = require("./router/dashboard")
const UserRoutes = require("./router/user");
const Authentication = require("./router/authentication")

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));

app.use(ProductRoutes);
app.use(UserRoutes);
app.use(Authentication);

app.listen(3000, ()=> {
    console.log("Server running at port 3000")
});