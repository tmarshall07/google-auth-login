// Load sensitive environmental variables
require('dotenv').config({ path: `${__dirname}/.env` });

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');

const passport = require('passport');
const strategies = require('./passport/strategies');

const app = express();

// Configure passport
require('./passport/setup')(passport);

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

// Register all passport strategies
strategies.register(passport);

// launch our backend into a port
app.listen(process.env.PORT, () => console.log(`LISTENING ON PORT ${process.env.PORT}`));
