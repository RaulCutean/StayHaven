const asyncHandler = require("express-async-handler") ;
const jwt = require("jsonwebtoken");
const Place = require("../model/Place")

const getAddedPlacesController = asyncHandler(async (req , res) => {
    const {token} = req.cookies ;
    if(!token) {
        return res.status(400).json({message : "Must be logged in"})
    }
    try {
        await jwt.verify(token , process.env.JWT_SECRET , {} , async (err , decodedUserData) => {
            if(err) {
                throw err ;
            }
            const {id} = decodedUserData;
            const response = await Place.find({owner : id}).lean();
            if(!response) {
                return res.status(404).json({message : "Not Found"}) ;
            }
            return res.status(200).json(response);
        })
    }catch(e) {
        console.log(e) ;
    }

})

module.exports = getAddedPlacesController;