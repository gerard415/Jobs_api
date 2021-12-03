const jwt = require('jsonwebtoken')

const {Unathenticatederror} = require('../errors')

const authenticationMiddleware = async (req, res, next)=>{
    const authHead = req.headers.authorization

    if(!authHead || !authHead.startsWith('Bearer ')){
        throw new Unathenticatederror('No token provided')
    }

    const token = authHead.split(' ')[1]
    try {
        const payload = jwt.verify(token, process.env.jwt_secret)
        const{userId, name} = payload
        req.user = {userId, name}
        next()
    } catch (error) {
        throw new Unathenticatederror('You are not authourized to access this page')
    }
}

module.exports = authenticationMiddleware

//to use the authentication middleware, you can import it into your routes and put it infront of each of the routes.
//if you want all your routes to have the same authentication middleware then you could import it inside the app.js and put it infront of the route