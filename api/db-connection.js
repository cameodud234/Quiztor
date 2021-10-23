const mongoose = require("mongoose");
const MONGO_URI = "mongodb+srv://admin:ad031579031579@quiztor.undww.mongodb.net/Quiztor?retryWrites=true&w=majority";

mongoose.connect( MONGO_URI, {
    useNewUrlParser : true,
}).then(() => {
    console.log(MONGO_URI);
    console.log("Successfully connected to database");
})
.catch((err) => {
    console.log("database connection failed, exiting now...");
    console.error(err);
    process.exit(1);
});