let jwt = require('jsonwebtoken')



let createToken = (payload, secretKey) => {

    if (!payload) throw "Payload is must required"
    if(!secretKey) throw "SecretKey is must required"

    let jwtOptions = {expiresIn: "3h"}
    let token = jwt.sign(payload, secretKey, jwtOptions)

    return {
        tokenType: "Bearer",
        token: token,
        expiresIn: 10800000
    }
}



let login = (req, res, next) => {

    let authHeader = req.headers.authorization
    if (!authHeader) return res.sendStatus(401)

    let token = authHeader.split(" ")[1]
    if (!token) return res.sendStatus(401)

    let secretKey = process.env.JWT_SECRET_KEY
    jwt.verify(token, secretKey, async function(err, data){

        if(err) return res.sendStatus(401)
        else{
            req.user = data
        }
        next()
    })
}


module.exports = {
    createToken,
    login
}