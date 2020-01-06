module.exports = (engine_transmission) => {
    // eslint-disable-next-line global-require
    // const engine_transmissionController = require('../../organization/prodence/kendaraan/issue');
    const engine_transmissionController = require('../controllers/engine_transmission');

    engine_transmission.route('/api/engine_transmission/get')
        .post(engine_transmissionController.getEngine_transmission);

    engine_transmission.route('/api/engine_transmission')
        .post(engine_transmissionController.createEngine_transmission);

    engine_transmission.route('/api/engine_transmission')
        .put(engine_transmissionController.updateEngine_transmission);

    engine_transmission.route('/api/engine_transmission')
        .delete(engine_transmissionController.deleteEngine_transmission);
};