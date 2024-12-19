const express = require('express')
const getUserProfileController = require("../controllers/getUserProfileController");
const router = express.Router()



router.route("/").get(getUserProfileController) ;

module.exports = router;