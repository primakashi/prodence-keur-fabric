module.exports = function (access) { //eslint-disable-line
    const accessController = require('../controllers/access'); //eslint-disable-line

    access.route('/api/access/login')
        .post(accessController.userAccess);

    access.route('/api/access/enc')
        .post(accessController.encryption);
};
