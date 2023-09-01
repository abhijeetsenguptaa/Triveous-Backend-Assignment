const { DataTypes } = require('sequelize');
const { connection } = require('../configs/connection');


const Category = connection.define('Category', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataTypes.STRING,
    },
});

module.exports = { Category };
