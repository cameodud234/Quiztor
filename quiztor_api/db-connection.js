const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://<username>:<password>>@cluster0.99goa.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser : true,
    useUnifiedTopology: true,
});