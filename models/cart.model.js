const { DataTypes } = require('sequelize');
const { connection } = require('../configs/connection')

const Cart = connection.define('cart', {
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    productID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
});

module.exports = { Cart };
