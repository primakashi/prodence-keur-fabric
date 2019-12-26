// require package
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const conn = require('./connection').default;

// set environment
dotenv.config();

// set express app
const app = express();
const port = process.env.APP_PORT || 3001;

// checking connection from database
// eslint-disable-next-line no-unused-expressions
conn;

app.listen(port);

// eslint-disable-next-line no-console
console.log(`API server started on: ${port}`);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set cors
const corsOptions = {
    exposedHeaders: ['Authorization', 'App-Control'],
};

app.use(cors(
    corsOptions,
));


// ===================== REGISTER ROUTES ACCESS ============================= //

// access route
const access = require('./routes/access');

access(app);

// user route
const user = require('./routes/user');

user(app);

// user vehicle
const vehicle = require('./routes/vehicle');

vehicle(app);

// user request
const request = require('./routes/request');

request(app);

// user tools
const tools = require('./routes/tools');

tools(app);

const lightning = require('./routes/lightning');

lightning(app);

const payment = require('./routes/payment');

payment(app);

const tirerim = require('./routes/tirerim');

tirerim(app);

const bodyframe = require('./routes/bodyframe');

bodyframe(app);

const suspension = require('./routes/suspension');

suspension(app);

const other = require('./routes/other');

other(app);

const engine_transmission = require('./routes/engine_transmission');

engine_transmission(app);