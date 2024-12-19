const mongoose = require("mongoose") ;
const {Schema} = mongoose ;



const PlaceSchema = new Schema({
    owner : {
        type : Schema.Types.ObjectId ,
        ref : "Place" ,
    },
    title : {
        type : String ,
    },
    address : {
        type : String  ,
    },
    photos: {
        type : [String] ,
    },
    description : {
        type : String  ,
    },
    perks : {
        type : [String] ,
    },
    extraInfo : {
        type : String,
    },
    checkIn : {
        type: Number,
    },
        checkOut : {
        type : Number ,
    },
    maxGuests : {
        type : Number,
    },
    price : {
        type : Number ,
    }

})

const PlaceModel = mongoose.model("Place" , PlaceSchema) ;
module.exports =  PlaceModel ;