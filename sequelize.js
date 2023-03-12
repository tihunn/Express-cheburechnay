const {Sequelize} = require('sequelize')

module.exports = new Sequelize("mysql://user:pass@db:3306/data");