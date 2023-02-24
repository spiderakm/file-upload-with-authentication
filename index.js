const express = require('express')
const app  =  express()
const {connectDB} = require('./config/db')




const PORT = 1338;
//middlewares
app.use(express.json())
app.use(express.static('content'));
app.use(express.urlencoded({extended:false}))




app.listen(PORT,()=>{
    console.log("server is running")
    connectDB();
})


