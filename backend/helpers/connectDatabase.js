const mongoose = require("mongoose");
const env = require("./env");

exports.connectDatabase = () => {

    mongoose.connect(env('DB_URI')).then(() => {
        console.log("Database Conntected");
    }).catch((err) => {
        console.warn("Database Not Connected");
        console.error(err);
    })

}