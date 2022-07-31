let mongoose = require("mongoose")


function mongoDbConnection(){
    mongoose.connect(`${process.env.MONGO_URI}${process.env.DATABASE_NAME}`),{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
}

module.exports = {
    mongoDbConnection
}