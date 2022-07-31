let bcrypt = require("bcrypt")



let hashingPassword = async (password) => {

    const soltRound = await  bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, soltRound)


    return hashPassword
} 


let comparePassword = (password, hashPassword) => {

    let comparingPassword = bcrypt.compare(password, hashPassword)

    return comparingPassword
}



module.exports = {
    hashingPassword,
    comparePassword
}