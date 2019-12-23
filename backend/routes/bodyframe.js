module.exports = (bodyframe) => {
    // eslint-disable-next-line global-require
    // const vehicleController = require('../../organization/prodence/kendaraan/issue');
    const bodyframeController = require('../controllers/bodyframe');

    bodyframe.route('/api/bodyframe')
        .get(bodyframeController.getBodyFrame);

    bodyframe.route('/api/bodyframe')
        .post(bodyframeController.createBodyFrame);

    bodyframe.route('/api/bodyframe')
        .put(bodyframeController.updateBodyFrame);

    bodyframe.route('/api/bodyframe')
        .delete(bodyframeController.deleteBodyFrame);
};