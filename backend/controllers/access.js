const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');
const dotenv = require('dotenv');

const modelAccess = require('../models/access');
// const globalFunction = require('./check_token'); //eslint-disable-line

// set environment
dotenv.config();

exports.userAccess = function (req, res) { //eslint-disable-line
    // initial state for username and password
    const { username } = req.body;
    const generate = process.env.ENC_KEY;

    const password = CryptoJS.MD5(req.body.password).toString();

    modelAccess.loginUser(username, password, (err, data) => {
        if (err === 0) {
            res.status(400).send({ errors: 'Error wrong username or password' });
        } else if (err) {
            res.status(400).send({ err: true, errors: 'Error bad request data' });
        } else {
            let id;
            const key = generate;

            // set access token
            const accessToken = jwt.sign({ id }, key,
                {
                    expiresIn: '8h',
                    algorithm: 'HS512',
                });

            // set response
            const resp = data[0];
            delete resp.password;
            delete resp.create_date;
            delete resp.modify_date;

            resp.access_token = accessToken;
            resp.token_type = 'bearer';

            const response = {
                data: resp,
            };

            res.status(200);
            res.set({ Authorization: accessToken });
            res.send(response);
        }
    });
};

exports.encryption = (req, res) => {
    let AES = '';
    const response = {};
    let status = 200;

    try {
        AES = CryptoJS.AES.encrypt(req.body.password, process.env.ENC_KEY);
        response.encrypt = AES.toString();
    } catch (error) {
        console.log(error); // eslint-disable-line
        status = 400;
        response.encrypt = false;
    }

    // send response
    res.status(status);
    res.send(response);
};
