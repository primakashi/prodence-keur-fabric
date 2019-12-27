module.exports = (tools) => {
    // eslint-disable-next-line global-require
    // const toolsController = require('../../organization/prodence/kendaraan/issue');
    const toolsController = require('../controllers/tools');

    tools.route('/api/tools')
        .get(toolsController.getTools);

    tools.route('/api/tools')
        .post(toolsController.createTools);

    tools.route('/api/tools')
        .put(toolsController.updateTools);

    tools.route('/api/tools')
        .delete(toolsController.deleteTools);
};