const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError} = require('../errors')
const jwt = require('jsonwebtoken')

const register = async (req, res)=>{
    const user = await User.create({...req.body})
    //create the web token after creating the user
    const token = jwt.sign({userId:user._id, name:user.name}, 'jwtSecret', {expiresIn:'30d'})

    res.status(StatusCodes.CREATED).json({user: {name:user.name}, token})//always send back the token
}

const login = async (req, res)=>{
    res.send('login user') 
}

module.exports = {register, login}
 