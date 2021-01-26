// Load sensitive environmental variables
require('dotenv').config({ path: `${__dirname}/.env` });

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const session = require('express-session');

const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

const passport = require('passport');
const registerStrategies = require('./lib/registerStrategies');

const app = express();

const server = http.createServer(app);

// Local MongoDB route
const dbRoute = 'mongodb://localhost:27017/mycoolapp'

// Connect to the MongoDB database
mongoose.connect(dbRoute, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

db.once('open', () => {
  console.log('connected to the database');
});

// Checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Configure passport
require('./passport')(passport);

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// Enable sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
    store: new MongoStore({
      url: dbRoute,
    }),
  }),
);

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

// Register all passport strategies
registerStrategies(passport);

// Include routes
require('./routes')(app, passport);

// launch our backend into a port
server.listen(process.env.PORT, () => console.log(`LISTENING ON PORT ${process.env.PORT}`));
