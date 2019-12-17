const db = require('../connection.js');

const table = 'm_user';
const User = () => {};

User.getAllUser = (result) => {
    const queryset = 'SELECT user.id, user.username, user.email, user.phone,'
        + ' user.name, user.nip'
        + ` FROM ${table} as user`;

    db.query(queryset,
        (err, res) => {
            if (err) {
                result(err, null);
            } else {
                result(null, res);
            }
        });
};

User.getUser = (id, result) => {
    const queryset = 'SELECT user.id, user.username, user.email, user.phone,'
        + ' user.name, user.nip'
        + ` FROM ${table} as user`
        + ` WHERE user.id = ${id}`
        + ' LIMIT 1';

    db.query(queryset,
        (err, res) => {
            if (err) {
                result(err, null);
            } else {
                result(null, res[0]);
            }
        });
};

User.insertUser = (data, password, result) => {
    const queryset = `INSERT INTO ${table} (username, name, password, email, phone, nip)`
    + ' VALUES ?';

    const dataInsert = [
        [data.username, data.name, password, data.email, data.phone, data.nip],
    ];

    db.query(queryset, [dataInsert],
        (err, res) => { // eslint-disable-line
            if (err) {
                result(err, null);
            } else {
                db.query('SELECT user.id, user.username, user.email, user.phone,'
                    + ' user.name, user.nip'
                    + ` FROM ${table} as user`
                    + ` WHERE user.id = ${res.insertId}`,
                (err, res) => { // eslint-disable-line
                    if (err) {
                        result(err, null);
                    } else {
                        result(null, res[0]);
                    }
                });
            }
        });
};

User.updateUser = (data, result) => {
    const queryset = `UPDATE ${table} SET name = ?, email = ?, phone = ? WHERE id = ?`;
    const dataInsert = [
        [data.name], [data.email], [data.phone], [data.id],
    ];
    db.query(queryset, dataInsert,
        (err, res) => { // eslint-disable-line
            if (err) {
                result(err, null);
            } else {
                db.query('SELECT user.id, user.username, user.email, user.phone,'
                    + ' user.name, user.nip'
                    + ` FROM ${table} as user`
                    + ` WHERE user.id = ${data.id}`,
                (err, res) => { // eslint-disable-line
                    if (err) {
                        result(err, null);
                    } else {
                        result(null, res[0]);
                    }
                });
            }
        });
};

User.deleteUser = (id, result) => {
    const queryset = `DELETE FROM ${table} WHERE id = ${id}`;

    db.query(queryset,
        (err, res) => { // eslint-disable-line
            if (err) {
                result(err, null);
            } else {
                result(null, res.affectedRows);
            }
        });
};

User.changePassword = (id, password, result) => {
    const queryset = `UPDATE ${table} SET password = '${password}' WHERE id = ${id}`;

    db.query(queryset,
        (err, res) => { // eslint-disable-line
            if (err) {
                result(err, null);
            } else if (res.changedRows > 0) {
                result(null, id);
            } else if (res.changedRows === 0) {
                result(null, 0);
            } else {
                result(true, null);
            }
        });
};

module.exports = User;
