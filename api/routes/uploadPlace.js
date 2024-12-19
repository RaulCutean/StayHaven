const express = require('express')
const router = express.Router()
const handlePlaceAdderController = require("../controllers/handlePlaceAdderController")
const getAddedPlacesController = require("../controllers/getAddedPlaceController")
const updatePlaceController = require("../controllers/updatePlaceController")

router.route("/").post(handlePlaceAdderController).get(getAddedPlacesController).put(updatePlaceController) ;


module.exports = router