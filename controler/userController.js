const validation = require("../validations/validation")
const User = require("../models/user")
const utility = require("../utility/utility")
const jwtToken = require("../middleware/authentication")
const UserTypes = require("../enums/userTypes/userTypes")





let singhUp = async (req, res) => {

    const { error } = validation.createUserValidations(req.body)
    if (error) return res.json({ success: false, response: error.details[0].message })

    const findUser = await User.findOne({ email: req.body.email })
    if (findUser) return res.json({ success: false, response: `This ${req.body.email} is allready exist` })

    req.body.password = await utility.hashingPassword(req.body.password)

    let newCreateUser = new User({
        ...req.body
    })
    try {
        let createUser = await User.create(newCreateUser)
        createUser = createUser.toObject()
        delete createUser.password

        res.json({ success: true, response: createUser })
    }
    catch (err) {
        res.json({ success: false, response: "Internal Server Error" })
    }
}




let loginUser = async (req, res) => {

    const { error } = validation.loginValidation(req.body)
    if (error) return res.json({ success: false, response: error.details[0].message })

    const findUser = await User.findOne({ email: req.body.email })
    if (!findUser) return res.json({ success: false, response: `This ${email} does not exist, first create your account` })

    let dbPassword = findUser.password
    let password = req.body.password

    let comparePassword = utility.comparePassword(password, dbPassword)
    if (!comparePassword) return res.json({ success: false, response: "Your passwowrd is incorrect" })

    let payload = ({ id: findUser.id, email: findUser.email, userType: findUser.userType })
    let secretKey = process.env.JWT_SECRET_KEY

    let token = jwtToken.createToken(payload, secretKey)

    return res.json({ success: true, response: token })

}




let getUserById = async (req, res) => {
    try {
        let userId = req.user.id

        let findUser = await User.findById(userId)

        if (!findUser) return res.json({ success: false, response: "Users Not Found" })

        findUser = findUser.toObject()
        delete findUser.password

        return res.json({ success: true, response: findUser })
    } catch (err) {
        res.json({ success: false, response: "Internal Server Error" })
    }
}




let getAllCustomers = async (req, res) => {
    try {
        let userType = req.user.userType
        if (userType !== UserTypes.ADMIN) return res.json({ success: false, response: "You are Not Authorized to this APi" })

        console.log(userType.CUSTOMER)
        let AllCustomers = await User.find({ userType:  UserTypes.CUSTOMER})

        return res.json({ success: true, response: AllCustomers })
    }
    catch (err) {
        res.json({ success: false, response: "Internal Server Error" })
    }
}



module.exports = {
    singhUp,
    loginUser,
    getUserById,
    getAllCustomers
}