const express = require('express')
const router = express.Router()
const User = require("../models/userModel")
const bcrypt = require('bcrypt')

const {
    validateName,
    validateEmail,
    validatePass
} = require('../utils/validators.js')


router.post("/signup",async (req,res) => {
    try {
        const {name,email,password,isSeller} = req.body;

        const existingUser = await User.findOne({where:{email}});
        if(existingUser){
            return res.status(403).json({err:"user already exist"})
        }
        if(!validateName(name)){
            return res.status(400).json({err:"name validate fails"});
        }
        if(!validateEmail(email)){
            return res.status(400).json({err:"email validate fails"});
        }
        if(!validatePass(password)){
            return res.status(400).json({err:"password validate fails"});
        }


        const hashedPassword = await bcrypt.hash(password)
        const user = {
            email,
            name,
            isSeller,
            password:hashedPassword
        }
        const createdUser = await User.create(user)
        return res.status(201).json({
            message:`welcome ${createdUser.name}`
        })
    } catch (error) {
        return res.status(500).send(error)
        
    }
})






module.exports = router