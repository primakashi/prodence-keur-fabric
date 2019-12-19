module.exports = (request) => {
    // eslint-disable-next-line global-require
    // const requestController = require('../../organization/prodence/kendaraan/issue');
    const requestController = require('../controllers/request');

    request.route('/api/request')
        .get(requestController.getRequest);

    request.route('/api/request')
        .post(requestController.createRequest);

    request.route('/api/request')
        .put(requestController.updateRequest);

    request.route('/api/request')
        .delete(requestController.deleteRequest);
};