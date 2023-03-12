const {Sequelize} = require('sequelize')

module.exports = new Sequelize('data', 'user', 'pass', {
    host: 'localhost',
    dialect: 'mysql'
});