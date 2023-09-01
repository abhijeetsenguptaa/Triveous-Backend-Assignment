const sequelize = require('sequelize');


const connection = new sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    dialect: 'mysql',
    host: 'localhost'
})


module.exports = { connection };