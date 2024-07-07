const express = require('express')

const {login,signup} = require('../Controllers/authController');

const router = express.Router();


router.route("/login")
.post(login);

router.route("/signup")
.post(signup);