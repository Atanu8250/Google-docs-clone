const express = require("express");
const connectDB = require("./config/db");
const authRouter = require("./routes/auth.routes");
const docsRouter = require("./routes/document.routes");
const profileRouter = require("./routes/profile.routes");
const authCheck = require("./middlewares/auth.middleware");
const cors = require("cors");

require('dotenv').config();

const app = express();

app.use(cors()); // for cors error
app.use(express.json()); // body - parser


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

app.use(authCheck); // authentication middleware

app.use('/profile', profileRouter) // END_POINTS for usr's profile
app.use('/docs', docsRouter); // END-POINTS for documents


// WRONG END-POINT URL
app.use('*', async (req, res) => {
     res.sendStatus(422)
})

// app listener
app.listen(process.env.PORT || 8080, async () => {
     console.log(`server running on port ${process.env.PORT || 8080}`);
     try {
          console.log('⏳ Databse connecting...');
          await connectDB;
          console.log('✅ Database connected.');
     } catch (error) {
          console.log('❌ error:', error);
     }
})