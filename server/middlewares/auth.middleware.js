const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
require("dotenv").config();

const authCheck = (req, res, next) => {
     const token = req.headers.authorization;

     jwt.verify(token, process.env.SECRET_KEY, async function (err, decoded) {
          if (err) {
               return res.status(401).send({ message: "JWT verification error", error: err })
          }

          try {
               const matchedUser = await UserModel.findById(decoded.userId);
               if (matchedUser) {
                    req.headers.userId = decoded.userId;
                    next();
               } else {
                    res.status(401).send({ message: "User doesn't exist!" });
               }
          } catch (error) {
               console.log('error:', error)
               res.status(500).send({ message: error.message, error })
          }

     });

}

module.exports = authCheck;