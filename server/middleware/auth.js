'use strict';

const jwt = require('jsonwebtoken');

const { constants } = require('../utils');

const jwtSecretKey = 'IT_IS_SECRET_KEY';
const jwtExpiresIn = '365d';

/**
 * @function Middleware.createToken
 * @description Global Function for creating JWT TOKENS
 * @param {*} userId {string}
 * @param {*} options {object}
 * @returns {*} jwtToken {string}
 */
const createToken = async(userId, options) => {
    const payload = {
        userId: userId,
        ...options
    };
    const jwtToken = await jwt.sign(payload, jwtSecretKey, {
        expiresIn: jwtExpiresIn
    });
    return jwtToken;
};

/**
 * @function Middleware.authenticateRequest
 * @description Authorization Middleware to handle API request
 * @param {*} req {object}
 * @param {*} res {object}
 * @param {*} next {object}
 */
const authenticateRequest = async(req, res, next) => {
    try {
        const bearerToken = req['headers']['authorization'];
        if (!bearerToken) {
            return res.status(constants.ERROR_CODES.UNAUTHORIZED).send({isSuccess: false, message: 'Authorization Token not found'});
        };
        const token = bearerToken;
        var decoded = await jwt.verify(token, jwtSecretKey);
        if (decoded) {
            const userId = decoded.userId;
            req.userId = userId;
            next();
        } else {
            return res.status(constants.ERROR_CODES.UNAUTHORIZED).send({isSuccess: false, message: 'Invalid Authorization Token'});
        }
    } catch (err) {
        console.log(`Authorization error at [${req.baseUrl}] :: [${JSON.stringify(err)}]`);
        return res.status(constants.ERROR_CODES.INTERNAL_SERVER_ERROR).send({isSuccess: false, message: 'something went wrong'});
    }
};

module.exports = {
    createToken,
    authenticateRequest
};
