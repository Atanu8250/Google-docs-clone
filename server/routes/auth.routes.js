const express = require('express');
const { userSignin, userSignUp } = require('../controllers/auth.controller');

const authRouter = express.Router();

authRouter.post("/signin", userSignin)
authRouter.post("/signup", userSignUp)

module.exports = authRouter;