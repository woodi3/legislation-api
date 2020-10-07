const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const config = require('./config/config');
const httpStatus = require('http-status');
const { rateLimiter } = require('./middlewares/rateLimiter');
const routes = require('./routes/v1');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');

const app = express();

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
// TODO only allow the website until we can open source & get api key stuff
app.options('*', cors());

// limit repeated failed requests to auth endpoints
if (config.env == 'production') {
    app.use('/api/v1/', rateLimiter);
}

// v1 api routes
app.use('/api/v1', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});
// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
