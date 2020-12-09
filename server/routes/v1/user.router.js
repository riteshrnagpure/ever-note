'use strict';

const express = require('express');
const auth = require('../../middleware/auth');

const registerController = require('../../controllers/user/register');

const router = express.Router();

router.post('/register', (req, res, next) => {
    registerController.register(req, res);
});

module.exports = router;