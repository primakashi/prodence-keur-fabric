const CryptoJS = require('crypto-js');
const userModel = require('../models/user');
const checkToken = require('./check_token');

exports.getAllUser = (req, res) => { // eslint-disable-line
    try {
        /**
         * Check validation token data
         * func in checkToken
         */
        const valid = checkToken.validateToken(req.headers.authorization);

        if (valid) {
            userModel.getAllUser((err, data) => {
                if (err) {
                    res.status(400);
                    res.send({
                        err: true,
                        message: 'Tidak dapat memproses data, '
                            + 'harap hubungi administrator!',
                    });
                } else {
                    const response = {
                        data: [],
                    };

                    if (Array.isArray(data)) {
                        response.data = data;
                    }

                    res.status(200);
                    res.send(response);
                }
            });
        } else {
            res.status(400);
            res.send({
                valid: false,
                token: 'expired',
                redirect: '/login',
            });
        }
    } catch (error) {
        res.status(500);
        res.send({
            err: true,
            errors: 'Error bad request data',
        });
    }
};

exports.getUser = (req, res) => { // eslint-disable-line
    try {
        /**
         * Check validation token data
         * func in checkToken
         */
        const valid = checkToken.validateToken(req.headers.authorization);

        if (valid) {
            // console.log(req.params); // eslint-disable-line
            if (req.params.id) {
                userModel.getUser(req.params.id, (err, data) => {
                    if (err) {
                        res.status(400);
                        res.send({
                            err: true,
                            message: 'Tidak dapat memproses data, '
                                + 'harap hubungi administrator!',
                        });
                    } else {
                        res.status(200);
                        res.send({ data });
                    }
                });
            } else {
                res.status(400);
                res.send({
                    valid: false,
                    message: 'Periksa kembali data yang anda input',
                });
            }
        } else {
            res.status(400);
            res.send({
                valid: false,
                token: 'expired',
                redirect: '/login',
            });
        }
    } catch (error) {
        res.status(500);
        res.send({
            err: true,
            errors: 'Error bad request data',
        });
    }
};

exports.insertUser = (req, res) => { // eslint-disable-line
    try {
        /**
         * Check validation token data
         * func in checkToken
         */
        const valid = checkToken.validateToken(req.headers.authorization);

        if (valid) {
            if (!req.body.password) {
                res.status(500);
                res.send({
                    err: true,
                    errors: 'Error bad request data',
                });
            } else {
                const password = CryptoJS.MD5(req.body.password).toString();

                userModel.insertUser(req.body, password, (err, data) => {
                    if (err) {
                        res.status(400);
                        res.send({
                            err: true,
                            message: 'Tidak dapat memproses data, '
                                + 'harap hubungi administrator!',
                        });
                    } else {
                        res.status(200);
                        res.send({ data });
                    }
                });
            }
        } else {
            res.status(400);
            res.send({
                valid: false,
                token: 'expired',
                redirect: '/login',
            });
        }
    } catch (error) {
        res.status(500);
        res.send({
            err: true,
            errors: 'Error bad request data',
        });
    }
};

exports.updateUser = (req, res) => { // eslint-disable-line
    try {
        /**
         * Check validation token data
         * func in checkToken
         */
        const valid = checkToken.validateToken(req.headers.authorization);

        if (valid) {
            userModel.updateUser(req.body, (err, data) => {
                if (err) {
                    res.status(400);
                    res.send({
                        err: true,
                        message: 'Tidak dapat memproses data, '
                            + 'harap hubungi administrator!',
                    });
                } else {
                    res.status(200);
                    res.send({ data });
                }
            });
        } else {
            res.status(400);
            res.send({
                valid: false,
                token: 'expired',
                redirect: '/login',
            });
        }
    } catch (error) {
        res.status(500);
        res.send({
            err: true,
            errors: 'Error bad request data',
        });
    }
};

exports.deleteUser = (req, res) => { // eslint-disable-line
    try {
        /**
         * Check validation token data
         * func in checkToken
         */
        const valid = checkToken.validateToken(req.headers.authorization);

        if (valid) {
            userModel.deleteUser(req.params.id, (err, data) => {
                if (err) {
                    res.status(400);
                    res.send({
                        err: true,
                        message: 'Tidak dapat memproses data, '
                            + 'harap hubungi administrator!',
                    });
                } else if (data) {
                    res.status(200);
                    res.send({
                        deleted: true,
                        message: 'Data berhasil dihapus!',
                    });
                } else {
                    res.status(200);
                    res.send({
                        message: 'Tidak ada perubahan pada data',
                    });
                }
            });
        } else {
            res.status(400);
            res.send({
                valid: false,
                token: 'expired',
                redirect: '/login',
            });
        }
    } catch (error) {
        res.status(500);
        res.send({
            err: true,
            errors: 'Error bad request data',
        });
    }
};

exports.changePassword = (req, res) => { // eslint-disable-line
    try {
        /**
         * Check validation token data
         * func in checkToken
         */
        const valid = checkToken.validateToken(req.headers.authorization);

        if (valid) {
            if (!req.body.password) {
                res.status(500);
                res.send({
                    err: true,
                    errors: 'Error bad request data',
                });
            } else {
                const password = CryptoJS.MD5(req.body.password).toString();

                userModel.changePassword(req.body.id, password, (err, id) => {
                    if (err) {
                        res.status(500);
                        res.send({
                            err: true,
                            errors: 'Error bad request data',
                        });
                    } else if (id > 0) {
                        res.status(200);
                        res.send({ data: { id } });
                    } else {
                        res.status(200);
                        res.send({ message: 'Tidak ada perubahan password' });
                    }
                });
            }
        } else {
            res.status(400);
            res.send({
                err: true,
                valid: false,
                token: 'expired',
                redirect: '/login',
            });
        }
    } catch (error) {
        res.status(500);
        res.send({
            err: true,
            errors: 'Error bad request data',
        });
    }
};
