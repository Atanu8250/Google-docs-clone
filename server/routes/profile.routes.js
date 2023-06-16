const express = require('express');
const { udpateProfile } = require('../controllers/profile.controller');
const profileRouter = express.Router();

profileRouter.patch('/', udpateProfile)

module.exports = profileRouter;