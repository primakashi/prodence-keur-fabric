const CryptoJS = require('crypto-js');
const newTools = require('../../organization/prodence/peralatan/issue');
const getOneTools = require('../../organization/prodence/peralatan/getperalatan');
const updateDataTools = require('../../organization/prodence/peralatan/update');
const deleteDataTools = require('../../organization/prodence/peralatan/delete');
const checkToken = require('./check_token');

exports.getTools = (req, res) => { // eslint-disable-line
    try {
        /**
         * Check validation token data
         * func in checkToken
         */
        const valid = checkToken.validateToken(req.headers.authorization);
        // const valid = true;

        if (valid) {
            getOneTools.getPeralatan(req.body, (err,data)=>{
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

exports.createTools = (req, res) => { // eslint-disable-line
    try {
        /**
         * Check validation token data
         * func in checkToken
         */
        const valid = checkToken.validateToken(req.headers.authorization);
        // const valid = true;

        if (valid) {
            newTools.createPeralatan(req.body, (err,data)=>{
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

exports.updateTools = (req, res) => { // eslint-disable-line
    try {
        /**
         * Check validation token data
         * func in checkToken
         */
        const valid = checkToken.validateToken(req.headers.authorization);
        // const valid = true;

        if (valid) {
            updateDataTools.updatePeralatan(req.body, (err,data)=>{
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

exports.deleteTools = (req, res) => { // eslint-disable-line
    try {
        /**
         * Check validation token data
         * func in checkToken
         */
        const valid = checkToken.validateToken(req.headers.authorization);
        // const valid = true;

        if (valid) {
            deleteDataTools.deletePeralatan(req.body, (err,data)=>{
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
