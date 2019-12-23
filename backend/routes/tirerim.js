module.exports = (tirerim) => {
    // eslint-disable-next-line global-require
    // const vehicleController = require('../../organization/prodence/kendaraan/issue');
    const tirerimController = require('../controllers/tirerim');

    tirerim.route('/api/tirerim')
        .get(tirerimController.getTireRim);

    tirerim.route('/api/tirerim')
        .post(tirerimController.createTireRim);

    tirerim.route('/api/tirerim')
        .put(tirerimController.updateTireRim);

    tirerim.route('/api/tirerim')
        .delete(tirerimController.deleteTireRim);
};