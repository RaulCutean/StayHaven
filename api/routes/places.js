const express = require("express") ;
const router = express.Router();
const getAllAddedPlacesController = require("../controllers/getAllAddedPlacesController")


router.route('/').get(getAllAddedPlacesController);


module.exports = router ;