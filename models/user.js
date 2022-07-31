let mongoose = require("mongoose")
let userType = require("../enums/userTypes/userTypes")


let User = mongoose.Schema({

    fistName:{
        type: String,
        require: true
    },
    lastName:{
        type: String
    },
    mobile:{
        type: String,
        maxLength: 10,
        minLength: 10
    },
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    userType:{
        type: String,
        require: true,
        enum: [userType.CUSTOMER, userType.ADMIN]
    }
})


let user = mongoose.model("user", User)

module.exports = user