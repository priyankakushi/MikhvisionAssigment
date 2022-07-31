let joi = require("joi")
let userType = require("../enums/userTypes/userTypes")



let createUserValidations = (body) => {

    let createUserSchema = joi.object({
        firstName: joi.string().required(),
        lastName: joi.string(),
        mobile: joi.string().required().max(10).min(10),
        email: joi.string().required().email(),
        password: joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')),
        confirmPassword: joi.ref("password"),
        userType: joi.string().valid(userType.ADMIN, userType.CUSTOMER)
    })

    return createUserSchema.validate(body)
}



let loginValidation = (body) => {

    let loginUserSchema = joi.object({
        email: joi.string().required().email(),
        password: joi.string().required()
    })
    
    return loginUserSchema.validate(body)
}



module.exports = {
    createUserValidations,
    loginValidation
}