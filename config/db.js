const {Sequelize} = require('sequelize')

const createDB = new Sequelize('test-db','user','pass',{
    dialect:'sqlite',
    host:'./config/db.sqlite'
})

const connectToDB = () => {
    createDB.sync().then(() => {
        console.log("connected to db")
    })
    .catch((e) => console.log("db failed",e))
}

module.exports = { createDB,connectToDB }