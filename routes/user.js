const express = require('express')
const router = express.Router()
const User = require("../models/userModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const {
    validateName,
    validateEmail,
    validatePassword
} = require('../utils/validators.js')
const { JsonWebTokenError } = require('jsonwebtoken')


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
        if(!validatePassword(password)){
            return res.status(400).json({err:"password validate fails"});
        }


        const hashedPassword = await bcrypt.hash(password, (saltOrRounds = 10))
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
        console.log(error)
        return res.status(500).send(error)
        
    }
})

router.post("/signin", async (req,res) => {
    try {

        const {email,password} = req.body;
        if(email.length === 0){
            return res.status(400).json({
                err:"please enter email"
            })
        }
        if(password.length === 0){
            return res.status(400).json({
                err:"please enter password"
            })
        }
        const existingUser = await User.findOne({where:{email}})
        if(!existingUser){
            return res.status(404).json({
                err:"user not found "
            })
        }

        const passwordMatch = await bcrypt.compare(password,existingUser.password)
        if(!passwordMatch){
            return res.status(404).json({
                err:"wrong email or password"
            })
        }
        const payload = {user: { id:existingUser.id }}
        const bearerToken = await jwt.sign(payload,"secret message",{
            expiresIn:36000
        })
        res.cookie('t',bearerToken,{ expire:new Date() + 9999 })
        return res.status(200).json({
            bearerToken
        })
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})
router.get('/signout',(res,req) => {
    try {
        res.clearCookie('t')
        return res.status(200).json({
            message:"sign out successfully cookie deleted "
        })
    } catch (error) {
        res.status(500).send(error)
    }
})



module.exports = router