module.exports = (user) => {
    // eslint-disable-next-line global-require
    const userController = require('../controllers/user');

    user.route('/api/user')
        .get(userController.getAllUser);

    user.route('/api/user/:id')
        .get(userController.getUser);

    user.route('/api/user')
        .post(userController.insertUser);

    user.route('/api/user')
        .put(userController.updateUser);

    user.route('/api/user/:id')
        .delete(userController.deleteUser);

    user.route('/api/user/change')
        .put(userController.changePassword);
};
