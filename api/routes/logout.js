const express = require("express") ;

const router = express.Router() ;
const handleLogoutController = require("../controllers/handleLogoutController")


router.route("/").post(handleLogoutController) ;

module.exports = router;