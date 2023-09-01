const express = require('express');
const { registerUser, loginUser, logOutUser } = require('../controllers/user.controller');


const userRoute = express.Router();

userRoute.post('/register', registerUser);

userRoute.post('/login', loginUser);

userRoute.post('/logout', logOutUser);

module.exports = { userRoute };