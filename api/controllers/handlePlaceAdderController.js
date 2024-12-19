const asyncHandler = require('express-async-handler');
const Place = require("../model/Place")
const jwt = require("jsonwebtoken");
const handlePlaceAdderController = asyncHandler(async ( req , res) => {
    const { title , address , addedPhotos
        , description , perks , extraInfo,
        checkIn , checkOut , maxGuests , price} = req.body ;
    const {token} = req.cookies ;

    if(!title || !address || !description || !extraInfo || !checkIn
        || !checkOut || !maxGuests || !addedPhotos || addedPhotos.length === 0 || !Array.isArray(addedPhotos)
        || perks.length === 0 || !Array.isArray(perks) || !price) {
        return res.status(400).json({message : "All fields are required"})
    }
    if(!token) {
        return res.status(401).json({message : "Must be logged in"}) ;
    }else {
        try {
            jwt.verify(token, process.env.JWT_SECRET, {}, async (err, decodedUserData) => {
                if (err) {
                    throw err
                }
                const userData =
                    {owner : decodedUserData.id ,   title ,  address ,  photos: addedPhotos
                    ,  description ,  perks ,  extraInfo ,
                     checkIn ,  checkOut ,  maxGuests , price}

                const placeDocument = await Place.create(userData);
                res.status(201).json(placeDocument);
            })
        } catch (e) {
            console.log(e);
        }
    }

})

module.exports = handlePlaceAdderController;