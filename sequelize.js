const {Sequelize} = require('sequelize')

module.exports = new Sequelize("mysql://root:pass@db:3306/mysql");