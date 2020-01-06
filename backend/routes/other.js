module.exports = (other) => {
    // eslint-disable-next-line global-require
    // const toolsController = require('../../organization/prodence/kendaraan/issue');
    const otherController = require('../controllers/other');

    other.route('/api/other/get')
        .post(otherController.getOther);

    other.route('/api/other')
        .post(otherController.createOther);

    other.route('/api/other')
        .put(otherController.updateOther);

    other.route('/api/other')
        .delete(otherController.deleteOther);
};