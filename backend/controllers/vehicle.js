const CryptoJS = require('crypto-js');
const newVehicle = require('../../organization/prodence/kendaraan/issue');
const getOneVehicle = require('../../organization/prodence/kendaraan/getKendaraan');
const updateDataVehicle = require('../../organization/prodence/kendaraan/update');
const deleteDataVehicle = require('../../organization/prodence/kendaraan/delete');
const checkToken = require('./check_token');

exports.getAllVehicle = (req, res) => { // eslint-disable-line
    try {
        /**
         * Check validation token data
         * func in checkToken
         */
        const valid = checkToken.validateToken(req.headers.authorization);
        // const valid = true;

        if (valid) {
            getOneVehicle.createVehicle(req.body, (err,data)=>{
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

exports.createVehicle = (req, res) => { // eslint-disable-line
    try {
        /**
         * Check validation token data
         * func in checkToken
         */
        const valid = checkToken.validateToken(req.headers.authorization);
        // const valid = true;

        if (valid) {
            newVehicle.createVehicle(req.body, (err,data)=>{
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

exports.updateVehicle = (req, res) => { // eslint-disable-line
    try {
        /**
         * Check validation token data
         * func in checkToken
         */
        const valid = checkToken.validateToken(req.headers.authorization);
        // const valid = true;

        if (valid) {
            updateDataVehicle.createVehicle(req.body, (err,data)=>{
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

exports.deleteVehicle = (req, res) => { // eslint-disable-line
    try {
        /**
         * Check validation token data
         * func in checkToken
         */
        const valid = checkToken.validateToken(req.headers.authorization);
        // const valid = true;

        if (valid) {
            deleteDataVehicle.deleteVehicle(req.body, (err,data)=>{
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
