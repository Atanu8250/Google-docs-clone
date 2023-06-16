const express = require("express");
const connectDB = require("./config/db");
const authRouter = require("./routes/auth.routes");
const authCheck = require("./middlewares/auth.middleware");
const cors = require("cors");

require('dotenv').config();

const app = express();
// for cors error
app.use(cors());
// body - parser
app.use(express.json());


app.get('/', async (req, res) => {
     try {
          res.status(200).send({ message: 'Welcome to homepage' });
     } catch (error) {
          console.log('error:', error)
          res.status(500).send({ message: 'Internal server error!', error });
     }
})

// for authentication
app.use("/auth", authRouter);

// authentication middleware
app.use(authCheck);


// WRONG END-POINT URL
app.use('*', async (req, res) => {
     res.sendStatus(422)
})

// app listener
app.listen(process.env.PORT || 8080, async () => {
     try {
          console.log(`server running on port ${process.env.PORT || 8080}`);
          console.log('⏳ Databse connecting...');
          await connectDB;
          console.log('✅ Database connected.');
     } catch (error) {
          console.log('❌ error:', error);
     }
})