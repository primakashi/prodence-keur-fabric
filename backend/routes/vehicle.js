module.exports = (vehicle) => {
    // eslint-disable-next-line global-require
    // const vehicleController = require('../../organization/prodence/kendaraan/issue');
    const vehicleController = require('../controllers/vehicle');

    vehicle.route('/api/vehicle/get')
        .post(vehicleController.getAllVehicle);

    vehicle.route('/api/vehicle')
        .post(vehicleController.createVehicle);

    vehicle.route('/api/vehicle')
        .put(vehicleController.updateVehicle);

    vehicle.route('/api/vehicle')
        .delete(vehicleController.deleteVehicle);
};