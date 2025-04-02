const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost:27017/iNoteBook?readPreference=primary&directConnection=true&ssl=false";
// const mongoURI = "mongodb+srv://madhudevari:Madhu@1318@cluster0.rgiwv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


const connectToMongo = () => {
    mongoose.connect(mongoURI);
    
    console.log("Mongo connected successfully");
}

module.exports = connectToMongo;