const express = require('express');
const router = express.Router() ;
const getPlaceIdController = require("../controllers/getPlaceIdController")


router.route("/").get(getPlaceIdController); ;


module.exports = router ;