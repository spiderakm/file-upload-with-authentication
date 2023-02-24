const {Sequilize} = require('sequelize')

const createDB = new Sequilize('test-db','user','pass',{
    dialect:'sqlite',
    host:'./config/db.sqlite'
})

const connectDB = () => {
    createDB.sync().then(() => {
        console.log("connected to db")
    })
    .catch((e) => console.log("db failed",e))
}

module.exports = { createDB,connectDB }