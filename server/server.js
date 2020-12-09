'use strict';

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const connectionHelper = require('./utils/connectionHelper');

const userRouter = require('./routes/v1/user.router');
const noteRouter = require('./routes/v1/note.router');
const { constants } = require('./utils');

app.use(`${constants.BASE_URL}/v1/user`, userRouter);
app.use(`${constants.BASE_URL}/v1/note`, noteRouter);

connectionHelper.init()
.then(() => {
    app.listen(constants.PORT, '0.0.0.0', () => {
        console.log(`Server is listening on [http://0.0.0.0:${constants.PORT}]`);
    });
})
.catch((error) => {
    console.error(`error in connection :: [${JSON.stringify(error)}]`);
    process.exit(0);
})
