module.exports = (brake) => {
    // eslint-disable-next-line global-require
    // const brakeController = require('../../organization/prodence/kendaraan/issue');
    const brakeController = require('../controllers/brake');

    brake.route('/api/brake')
        .get(brakeController.getBrake);

    brake.route('/api/brake')
        .post(brakeController.createBrake);

    brake.route('/api/brake')
        .put(brakeController.updateBrake);

    brake.route('/api/brake')
        .delete(brakeController.deleteBrake);
};