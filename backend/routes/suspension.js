module.exports = (suspension) => {
    // eslint-disable-next-line global-require
    // const vehicleController = require('../../organization/prodence/kendaraan/issue');
    const suspensionController = require('../controllers/suspension');

    suspension.route('/api/suspension/get')
        .post(suspensionController.getSuspension);

    suspension.route('/api/suspension')
        .post(suspensionController.createSuspension);

    suspension.route('/api/suspension')
        .put(suspensionController.updateSuspension);

    suspension.route('/api/suspension')
        .delete(suspensionController.deleteSuspension);
};