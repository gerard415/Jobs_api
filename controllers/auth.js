const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, UnauthenticatedError} = require('../errors')
const jwt = require('jsonwebtoken')

const register = async (req, res)=>{
    const user = await User.create({...req.body})
    //as you recall, we already wrote the logic to create the token using the createJwt function in the auth.js
    //To use the createJwt function to create a token you simply invoke it here.
    const token = user.createJwt()
    res.status(StatusCodes.CREATED).json({user: {name:user.name}, token})//always send back the token to the front end
}

const login = async (req, res)=>{
    const {email, password} = req.body
    //checking if both the email and password are provided
    if(!email || !password){
        throw new BadRequestError('please provide a username and password')
    }
    //finding a user with the email, if the user doesnt exist, return an error
    const user = await User.findOne({email})
    if(!user){
        throw new UnauthenticatedError('Invalid email or password')
    } 
    //using the comparePassword function in the User.js model to compare the passwords
    const isPasswordMatch = await user.comparePassword(password)
    if(!isPasswordMatch){
        throw new UnauthenticatedError('Invalid email or password')
    }
    const token = user.createJwt()
    res.status(StatusCodes.OK).json({user: {name:user.name}, token})
}

module.exports = {register, login}
 