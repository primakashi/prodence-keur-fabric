module.exports = (payment) => {
    // eslint-disable-next-line global-require
    // const paymentController = require('../../organization/prodence/kendaraan/issue');
    const paymentController = require('../controllers/payment');

    payment.route('/api/payment')
        .get(paymentController.getPayment);

    payment.route('/api/payment')
        .post(paymentController.createPayment);

    payment.route('/api/payment')
        .put(paymentController.updatePayment);

    payment.route('/api/payment')
        .delete(paymentController.deletePayment);
};