const {dataTypes, DataTypes} = require('sequelize')

const {createDB} = require('../config/db')

const User = createDB.define("user",{
    id:{
        primaryKey:true,
        allowNull:false,
        autoIncrement:true,
        type:DataTypes.INTEGER
    },
    name:DataTypes.STRING,
    email:dataTypes.STRING,
    password:DataTypes.STRING,
    isSeller:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }
})

module.exports = User