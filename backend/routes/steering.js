module.exports = (steering) => {
    // eslint-disable-next-line global-require
    // const vehicleController = require('../../organization/prodence/kendaraan/issue');
    const steeringController = require('../controllers/steering');

    steering.route('/api/steering')
        .get(steeringController.getSteering);

    steering.route('/api/steering')
        .post(steeringController.createSteering);

    steering.route('/api/steering')
        .put(steeringController.updateSteering);

    steering.route('/api/steering')
        .delete(steeringController.deleteSteering);
};