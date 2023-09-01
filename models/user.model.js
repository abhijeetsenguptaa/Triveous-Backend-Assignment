const { DataTypes } = require('sequelize');
const { connection } = require('../configs/connection');


const User = connection.define('users', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING,
    },
    lastName: {
        type: DataTypes.STRING,
    },
    role: {
        type: DataTypes.ENUM('user', 'seller', 'admin'),
        defaultValue: 'user',
        allowNull: false,
    },
    category: {
        type: DataTypes.ENUM('electronics', 'clothing', 'furniture', 'books', 'other'),
        allowNull: true, // Allow null if a user is not a seller
    },
});

module.exports = { User };
