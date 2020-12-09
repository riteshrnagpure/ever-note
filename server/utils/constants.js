'use strict';

const PORT = 8000;
const BASE_URL = '/ever-note';

const ERROR_CODES = {
    INTERNAL_SERVER_ERROR: 500,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
};

module.exports = {
    PORT,
    ERROR_CODES,
    BASE_URL
};