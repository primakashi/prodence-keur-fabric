const db = require('../connection.js');

const Access = function (user) { //eslint-disable-line
    this.username = user.username;
    this.password = user.password;
    this.name = user.name;
};

Access.loginUser = function getUserAccess(username, password, result) {
    db.query('SELECT * FROM m_user WHERE username = ? and password = ?',
        [username, password],
        (err, res) => {
            if (err) {
                result(err, null);
            } else if (res.length === 0) {
                result(0, null);
            } else {
                result(null, res);
            }
        });
};

module.exports = Access;
