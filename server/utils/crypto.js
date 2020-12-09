'use strict';

const crypto = require('crypto-js');

/**
 * @function crypto.encryptData
 * @description It will encrypt the given data
 * @param {*} data 
 */
const encryptData = (data) => {
    return crypto.MD5(data);
};

module.exports = {
    encryptData
};