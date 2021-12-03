const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError} = require('../errors')
const jwt = require('jsonwebtoken')

const register = async (req, res)=>{
    const user = await User.create({...req.body})
    //as you recall, we already wrote the logic to create the token using the createJwt function in the auth.js
    //To use the createJwt function to create a token you simply invoke it here.
    const token = user.createJwt()

    res.status(StatusCodes.CREATED).json({user: {name:user.name}, token})//always send back the token to the front end
}

const login = async (req, res)=>{
    res.send('login user') 
}

module.exports = {register, login}
 