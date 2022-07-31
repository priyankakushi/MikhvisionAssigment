let express = require("express")
let controler = require("../controler/userController")
const jwtToken = require("../middleware/authentication")


let router = express()

/**
 * @auth
 */
router.post("/singhUp", controler.singhUp)
router.post("/login", controler.loginUser)


/**
 * @USER_API
 */
router.get("/", jwtToken.login, controler.getUserById)
router.get("/getAllCustomers", jwtToken.login, controler.getAllCustomers)



module.exports = router