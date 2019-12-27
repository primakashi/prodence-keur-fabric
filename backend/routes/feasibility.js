module.exports = (feasibility) => {
    // eslint-disable-next-line global-require
    // const feasibilityController = require('../../organization/prodence/kendaraan/issue');
    const feasibilityController = require('../controllers/feasibility');

    feasibility.route('/api/feasibility')
        .get(feasibilityController.getFeasibility);

        feasibility.route('/api/feasibility')
        .post(feasibilityController.createFeasibility);

        feasibility.route('/api/feasibility')
        .put(feasibilityController.updateFeasibility);

        feasibility.route('/api/feasibility')
        .delete(feasibilityController.deleteFeasibility);
};