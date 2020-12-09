'use strict';

const connectionHelper = require('../../utils/connectionHelper');
const mysqlPool = connectionHelper.getConnection('mysql');

const register = async(data) => {
    const statement = `insert into user(name, email, phone, password) values('${data.name}', '${data.email}', '${data.phone}', '${data.password}')`;
    mysqlPool.query(statement, (error, result) => {
        if (error) {
            throw error;
        }
        return result;
    });
};

module.exports = {
    register
};
