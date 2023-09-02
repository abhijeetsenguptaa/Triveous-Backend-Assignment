const { DataTypes } = require('sequelize');
const { connection } = require('../configs/connection');

const Order = connection.define('orders', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    products: {
        type: DataTypes.JSON,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('pending', 'completed', 'canceled'),
        defaultValue: 'pending',
        allowNull: false,
    },
});

module.exports = { Order };
