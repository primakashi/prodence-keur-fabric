module.exports = (others) => {
    // eslint-disable-next-line global-require
    // const toolsController = require('../../organization/prodence/kendaraan/issue');
    const othersController = require('../controllers/others');

    others.route('/api/others')
        .get(othersController.getOthers);

    others.route('/api/others')
        .post(othersController.createOthers);

    others.route('/api/others')
        .put(othersController.updateOthers);

    others.route('/api/others')
        .delete(othersController.deleteOthers);
};