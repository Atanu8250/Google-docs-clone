const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Sign-in for users
const userSignin = async (req, res) => {
     const { email, password } = req.body;
     if (!email || !password) {
          res.status(403).send({ message: "Porvide proper-data for signin" });
          return;
     }

     try {
          const matchedUser = await UserModel.findOne({ email });
          if (matchedUser) {
               bcrypt.compare(password, matchedUser._doc.password, function (err, result) {
                    if (result) {
                         const token = jwt.sign({
                              userId: matchedUser._doc._id,
                         }, process.env.SECRET_KEY, { expiresIn: '7d' });
                         res.status(200).send({ message: "Login successful", user: { id: matchedUser._doc._id, name: matchedUser._doc.username, token } });
                    } else {
                         res.status(400).send({ message: "Wrong Password!", error: err })
                    }
               });
          } else {
               res.status(404).send({ message: "User not found!" });
          }
     } catch (error) {
          res.status(500).send({
               message: "Internal server error!",
               error: error.message
          });
     }
}

// Sign-up for users
const userSignUp = async (req, res) => {
     const { username, email, password } = req.body;

     // if username, email or password, any thing missing then reject the request
     if (!username || !email || !password) {
          res.status(403).send({ message: "Porvide proper-data for signin" });
          return;
     }

     try {
          const matchedUsers = await UserModel.find({ email });
          if (matchedUsers.length) {
               res.status(200).send({
                    message: "User already exists!"
               });
          } else {
               bcrypt.hash(password, +process.env.SALT_ROUND, async function (err, hash) {
                    if (err) {
                         res.status(500).send({
                              message: "error in bcrypt"
                         });
                    } else {
                         try {
                              const user = new UserModel({ username, email, password: hash });
                              await user.save();

                              res.status(201).send({
                                   message: "Sign-up Sccessful"
                              })
                         } catch (error) {
                              console.log('error:', error)
                              res.status(400).send({
                                   message: error.message,
                                   error: error
                              });
                         }
                    }
               });
          }
     } catch (error) {
          res.status(500).send({
               message: "Internal server error!",
               error: error
          });
     }
}

module.exports = { userSignin, userSignUp };