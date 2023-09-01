const { DataTypes } = require('sequelize');
const { connection } = require('../configs/connection');
const { Category } = require('./category.model');
const { User } = require('./user.model');

const Product = connection.define('products', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT('long'),
    },
    availability: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    categoryID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: 'id'
        }
    },
    sellerID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    }
})

Product.belongsTo(Category, {
    foreignKey: 'categoryID',
    onDelete: 'CASCADE'
})

Product.belongsTo(User, {
    foreignKey: 'sellerID',
    onDelete: 'CASCADE'
})

Category.hasMany(Product, {
    foreignKey: 'categoryID',
    onDelete: 'CASCADE'
})

User.hasMany(Product, {
    foreignKey: 'sellerID',
    onDelete: 'CASCADE'
})


module.exports = { Product };