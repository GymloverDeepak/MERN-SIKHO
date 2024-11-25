const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/";

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI); // No need for useNewUrlParser or useUnifiedTopology
        console.log("Connected successfully to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}

module.exports = connectToMongo;
 