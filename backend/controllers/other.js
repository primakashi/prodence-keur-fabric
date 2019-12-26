const CryptoJS = require('crypto-js');
const newOther = require('../../organization/prodence/other/issue');
const getOneOther = require('../../organization/prodence/other/get');
const updateDataOther = require('../../organization/prodence/other/update');
const deleteDataOther = require('../../organization/prodence/other/delete');
const checkToken = require('./check_token');

exports.getOther = (req, res) => { // eslint-disable-line
    try {
        /**
         * Check validation token data
         * func in checkToken
         */
        const valid = checkToken.validateToken(req.headers.authorization);
        // const valid = true;

        if (valid) {
            getOneOther.getOther(req.body, (err,data)=>{
                if (err) {
                    res.status(400);
                    res.send({
                        err: true,
                        message: 'Tidak dapat memproses data, '
                            + 'harap hubungi administrator!',
                    });
                } else if (data) {
                    res.status(200);
                    res.send(data);
                }
            })
        } else {
            res.status(400);
            res.send({
                valid: false,
                token: 'expired',
                redirect: '/login',
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500);
        res.send({
            err: true,
            errors: 'Error bad request data',
        });
    }
};

exports.createOther = (req, res) => { // eslint-disable-line
    try {
        /**
         * Check validation token data
         * func in checkToken
         */
        const valid = checkToken.validateToken(req.headers.authorization);
        // const valid = true;

        if (valid) {
            newOther.createOther(req.body, (err,data)=>{
                if (err) {
                    res.status(400);
                    res.send({
                        err: true,
                        message: 'Tidak dapat memproses data, '
                            + 'harap hubungi administrator!',
                    });
                } else if (data) {
                    res.status(200);
                    res.send(data);
                }
            })
        } else {
            res.status(400);
            res.send({
                valid: false,
                token: 'expired',
                redirect: '/login',
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500);
        res.send({
            err: true,
            errors: 'Error bad request data',
        });
    }
};

exports.updateOther = (req, res) => { // eslint-disable-line
    try {
        /**
         * Check validation token data
         * func in checkToken
         */
        const valid = checkToken.validateToken(req.headers.authorization);
        // const valid = true;

        if (valid) {
            updateDataOther.updateOther(req.body, (err,data)=>{
                if (err) {
                    res.status(400);
                    res.send({
                        err: true,
                        message: 'Tidak dapat memproses data, '
                            + 'harap hubungi administrator!',
                    });
                } else if (data) {
                    res.status(200);
                    res.send(data);
                }
            })
        } else {
            res.status(400);
            res.send({
                valid: false,
                token: 'expired',
                redirect: '/login',
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500);
        res.send({
            err: true,
            errors: 'Error bad request data',
        });
    }
};

exports.deleteOther = (req, res) => { // eslint-disable-line
    try {
        /**
         * Check validation token data
         * func in checkToken
         */
        const valid = checkToken.validateToken(req.headers.authorization);
        // const valid = true;

        if (valid) {
            deleteDataOther.deleteOther(req.body, (err,data)=>{
                if (err) {
                    res.status(400);
                    res.send({
                        err: true,
                        message: 'Tidak dapat memproses data, '
                            + 'harap hubungi administrator!',
                    });
                } else if (data) {
                    res.status(200);
                    res.send(data);
                }
            })
        } else {
            res.status(400);
            res.send({
                valid: false,
                token: 'expired',
                redirect: '/login',
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500);
        res.send({
            err: true,
            errors: 'Error bad request data',
        });
    }
};
