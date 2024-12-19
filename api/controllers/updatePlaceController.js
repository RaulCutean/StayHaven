const asyncHandler = require("express-async-handler")
const Place = require("../model/Place")
const jwt = require("jsonwebtoken")

const updatePlaceController = asyncHandler(async (req, res) => {
    const {token} = req.cookies ;
    const { id , title , address , addedPhotos
        , description , perks , extraInfo,
        checkIn , checkOut , maxGuests , price} = req.body ;
    jwt.verify(token , process.env.JWT_SECRET , {} , async (err , decodedUserData) => {
        if(err) {
            throw err
        }
        const placeDoc = await Place.findById(id) ;
        if(decodedUserData.id === placeDoc.owner.toString()) {
            placeDoc.set({
                title, address, photos: addedPhotos, description, perks, extraInfo ,
                checkIn , checkOut , maxGuests , price
            }) ;
            await placeDoc.save()
            res.json('ok')
        }
    })
})

module.exports = updatePlaceController;