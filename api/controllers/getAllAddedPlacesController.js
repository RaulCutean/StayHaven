const asyncHandler = require("express-async-handler");
const Place = require("../model/Place")


const getAllAddedPlacesController = asyncHandler(async (req, res) => {
    const allPlaces = await Place.find() ;
    res.status(200).json(allPlaces) ;

})


module.exports = getAllAddedPlacesController;