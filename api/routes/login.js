const express = require('express');
const router = express.Router() ;
const handleLoginController = require("../controllers/handleLoginController")

router.route("/").post(handleLoginController) ;


module.exports = router;