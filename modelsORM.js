const sequelize = require('./sequelize')
const {DataTypes} = require('sequelize')

const Cheburek = sequelize.define( 'cheburek', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nameImg: {type: DataTypes.STRING},
    name: {type: DataTypes.STRING},
    price: {type: DataTypes.INTEGER},
})


module.exports = {
    Cheburek,
}