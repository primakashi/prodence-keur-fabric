const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

// set environment
dotenv.config();

exports.validateToken = function (access) { //eslint-disable-line
    let valid = false;
    const generate = process.env.ENC_KEY;

    try {
        const now = parseInt(new Date().getTime() / 1000); //eslint-disable-line
        var access = (access).replace(/^Bearer\s/, ''); //eslint-disable-line

        jwt.verify(access, generate, { algorithms: ['HS512'] },
            (err, decode) => {
                if (err) {
                    console.log(err); //eslint-disable-line
                    valid = false;
                } else {
                    // console.log(decode)
                    if (now < decode.exp) { //eslint-disable-line
                        valid = true;
                    } else {
                        valid = false;
                    }
                }
            });
    } catch (error) {
        valid = false;
    }

    return valid;
};
