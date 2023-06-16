const mongoose = require("mongoose");
require('dotenv').config();


const connectDB = mongoose.connect(process.env.DATABASE_URL);

module.exports = connectDB;