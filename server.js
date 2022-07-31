let express = require("express")
let userRouter = require("./routes/user")
let mongoDBConnection = require("./connection/mongoDbConnection")
require("dotenv").config()

let app = express()

app.use(express.json())
app.use("/user", userRouter)

mongoDBConnection.mongoDbConnection()

let PORT = process.env.PORT

app.listen(PORT, function(){
    console.log("Server is ready 😀 at 🚀🚀 http://localhost:3000")
})