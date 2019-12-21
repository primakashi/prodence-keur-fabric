module.exports = (lightning) => {
    // eslint-disable-next-line global-require
    // const requestController = require('../../organization/prodence/kendaraan/issue');
    const lightningController = require('../controllers/lightning');

    lightning.route('/api/lightning')
        .get(lightningController.getLightning);

    lightning.route('/api/lightning')
        .post(lightningController.createLightning);

    lightning.route('/api/lightning')
        .put(lightningController.updateLightning);

    lightning.route('/api/lightning')
        .delete(lightningController.deleteLightning);
};