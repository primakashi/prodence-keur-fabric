const CryptoJS = require('crypto-js');
const newEngine_transmission = require('../../organization/prodence/mesin_transmisi/issue');
const getOneEngine_transmission = require('../../organization/prodence/mesin_transmisi/getmesin_transmisi');
const updateDataEngine_transmission = require('../../organization/prodence/mesin_transmisi/update');
const deleteDataEngine_transmission = require('../../organization/prodence/mesin_transmisi/delete');
const checkToken = require('./check_token');

exports.getEngine_transmission = (req, res) => { // eslint-disable-line
    try {
        /**
         * Check validation token data
         * func in checkToken
         */
        const valid = checkToken.validateToken(req.headers.authorization);
        // const valid = true;

        if (valid) {
            getOneEngine_transmission.getMesin_transmisi(req.body, (err,data)=>{
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

exports.createEngine_transmission = (req, res) => { // eslint-disable-line
    try {
        /**
         * Check validation token data
         * func in checkToken
         */
        const valid = checkToken.validateToken(req.headers.authorization);
        // const valid = true;

        if (valid) {
            newEngine_transmission.createMesin_transmisi(req.body, (err,data)=>{
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

exports.updateEngine_transmission = (req, res) => { // eslint-disable-line
    try {
        /**
         * Check validation token data
         * func in checkToken
         */
        const valid = checkToken.validateToken(req.headers.authorization);
        // const valid = true;

        if (valid) {
            updateDataEngine_transmission.updateMesin_transmisi(req.body, (err,data)=>{
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

exports.deleteEngine_transmission = (req, res) => { // eslint-disable-line
    try {
        /**
         * Check validation token data
         * func in checkToken
         */
        const valid = checkToken.validateToken(req.headers.authorization);
        // const valid = true;

        if (valid) {
            deleteDataEngine_transmission.deleteMesin_transmisi(req.body, (err,data)=>{
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
