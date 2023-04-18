const express = require("express")
const router = express.Router()
const gpsController = require("../controllers/gpsController")
const auth = require("../midi/auth")
const userController = require("../controllers/userController")



router.post("/api/signup", userController.userData)
router.post("/api/login", userController.logIn )
// ===== create gps data route not connfirm ...
router.post("/api/gps",auth.authentication, gpsController.locationData )

router.get("/api", auth.authentication, gpsController.getAll  )

router.get("/api/:deviceid",auth.authentication, gpsController.getParticular  )

router.get("/", (req, res)=>{
    res.send({status:true , message:"your application is running on server"})
})






module.exports = router