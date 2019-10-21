const Sequelize = require('sequelize');
const db = require('../index');
const uuid = require('uuid/v4');

const User = db.define('Users', {
    id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: () => uuid()
    },
    username: {
        type: Sequelize.STRING,
        unique: true,
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
    },
    password: {
        type: Sequelize.STRING
    }
});
module.exports = User;
