const mongoose = require("mongoose");
const config = require("config"); //config is a package that allows you to call configurations from different json files
const db = config.get("mongoURI");  //This is calling the mongo atlas configuration from the default.json file where it is stored

const connectDB = async () => {      //asynchronous function 
    try{
        await mongoose.connect(db);    //Waits until mongoose connects to mongoURI database to move on till the next piece of code

        console.log("MongoDB Connected...");

    }catch(err){

        console.error(err.message);
        //Exit process with failure
        process.exit(1);

    }
}

module.exports = connectDB;