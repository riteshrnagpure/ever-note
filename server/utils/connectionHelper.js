'use strict';

const mysql = require('mysql2');

let connections = {};

/**
 * connectionHelper.connectMySql method to connect to mysql
 */
const connectMySql = () => {
    return new Promise((resolve, reject) => {
        const pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            database: 'evernote',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
        connections.mysql = pool;
        console.log('mysql connected successfully');
        return resolve();
    });
};

/**
 * connectionHelper.init method to initalize all connections
 */
const init = () => {
    return new Promise((resolve, reject) => {
        Promise.all([
            connectMySql()
        ])
        .then(() => {
            return resolve();
        })
        .catch((error) => {
            console.error(`error in init connection :: error [${JSON.stringify(error)}]`);
            return reject(error);
        })
    });
};

/**
 * Helper method to get connection
 * @param {*} connection 
 */
const getConnection = (connection) => {
    return connections[connection]
};

module.exports = {
    init,
    getConnection,
};
