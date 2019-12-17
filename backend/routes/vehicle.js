module.exports = (vehicle) => {
    // eslint-disable-next-line global-require
    // const vehicleController = require('../../organization/prodence/kendaraan/issue');
    const vehicleController = require('../controllers/vehicle');

    vehicle.route('/api/vehicle')
        .post(vehicleController.createVehicle);
};