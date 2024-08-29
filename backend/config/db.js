const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch(err) {
        console.log(`MongoDB Connection Error: ${err.message}`);
    }
}

module.exports = dbConnect;