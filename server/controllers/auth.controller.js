const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Sign-in for users
const userSignin = async (req, res) => {
     const { email, password } = req.body;

     // Check if email or password is missing
     if (!email || !password) {
          return res.status(403).send({ message: "Provide proper data for signin" });
     }

     try {
          // Find the user with the provided email
          const matchedUser = await UserModel.findOne({ email });

          // If no user found with the provided email, return an error
          if (!matchedUser) {
               return res.status(404).send({ message: "User not found!" });
          }

          // Compare the provided password with the hashed password stored in the user document
          bcrypt.compare(password, matchedUser._doc.password, function (err, result) {
               if (err) {
                    // If an error occurs during password comparison, return an error
                    return res.status(400).send({ message: "Error in decryption", error: err });
               }

               if (!result) {
                    // If an password doesn't match during password comparison
                    return res.status(400).send({ message: "Wrong Password!" });
               }

               // Generate a JSON Web Token (JWT) for the authenticated user
               const token = jwt.sign(
                    {
                         userId: matchedUser._doc._id,
                    },
                    process.env.SECRET_KEY,
                    { expiresIn: '7d' }
               );

               // Exclude the password from the user document before sending the response
               const { password, ...userCred } = matchedUser._doc;

               // Return a successful login response with the user's credentials and the JWT
               res.status(200).send({ message: "Login successful", user: { userCred, token } });
          });

     } catch (error) {
          console.log('error:', error)
          res.status(500).send({
               message: "Internal server error!",
               error: error.message
          });
     }
}

// Sign-up for users
const userSignUp = async (req, res) => {
     const { username, email, password } = req.body;

     // Check if username, email, or password is missing
     if (!username || !email || !password) {
          return res.status(403).send({ message: "Provide proper data for signup" });
     }

     try {
          // Check if a user with the provided email already exists
          const matchedUsers = await UserModel.find({ email });

          // If a user with the provided email exists, return an error
          if (matchedUsers.length) {
               return res.status(200).send({ message: "User already exists!" });
          }

          // Hash the password using bcrypt
          bcrypt.hash(password, +process.env.SALT_ROUND, async function (err, hash) {
               if (err) {
                    // If an error occurs during password hashing, return an error
                    return res.status(500).send({ message: "Error in bcrypt" });
               }

               try {
                    // Create a new user document with the provided username, email, and hashed password
                    const user = new UserModel({ username, email, password: hash });
                    await user.save();

                    // Return a successful signup response
                    res.status(201).send({
                         message: "Signup successful"
                    })
               } catch (error) {
                    console.log('error:', error)
                    res.status(400).send({
                         message: error.message,
                         error: error
                    });
               }
          });
     } catch (error) {
          console.log('error:', error)
          res.status(500).send({
               message: "Internal server error!",
               error: error
          });
     }
}

module.exports = { userSignin, userSignUp };
