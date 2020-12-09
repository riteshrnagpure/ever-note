'use strict';

const { constants, crypto } = require('../../utils');
const registerRepo = require('../../repositories/user/register');
const auth = require('../../middleware/auth');

const register = async(request, response) => {
    try {
        const body = request.body;
        if (!body.name) {
            return response.status(constants.ERROR_CODES.BAD_REQUEST).send({isSuccess: false, message: 'name is missing'});
        }
        if (!body.email) {
            return response.status(constants.ERROR_CODES.BAD_REQUEST).send({isSuccess: false, message: 'email is missing'});
        }
        if (!body.phone) {
            return response.status(constants.ERROR_CODES.BAD_REQUEST).send({isSuccess: false, message: 'phone is missing'});
        }
        if (!body.password) {
            return response.status(constants.ERROR_CODES.BAD_REQUEST).send({isSuccess: false, message: 'password is missing'});
        }
        const data = {
            name: body.name,
            email: body.email,
            phone: body.phone,
            password: crypto.encryptData(body.password)
        }
        const result = await registerRepo.register(data);
        const token = await auth.createToken(result.id);
        return response.send({isSuccess: true, data: { token, message: 'user added successfully'}});
    } catch (error) {
        console.error(`error in register controller :: error [${error}]`);
        return response.status(constants.ERROR_CODES.INTERNAL_SERVER_ERROR).send({isSuccess: false, message: 'something went wrong'});
    }
};

module.exports = {
    register
};
