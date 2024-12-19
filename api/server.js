/////////////////////////////
const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3500 ;
const {logger , logEvents} = require("./middleware/logger")
const errMiddleware = require("./middleware/errHandler");
const cors = require("cors");
const corsOptions = require("./config/corsOptions")
const mongoose = require("mongoose");
const dbConn = require("./config/dbConn")
const path = require("path");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const asyncHandler = require("express-async-handler")
const fs = require("fs");
const fsPromises = require("fs").promises;
const Place = require("./model/Place")
const Booking = require("./model/Booking")
void dbConn();
/////////////////////////////
//MIDDLEWARE
app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

//ROUTES
app.use("/" , express.static(path.join(__dirname , "static")))
app.use("/register" , require('./routes/register'))
app.use("/login" , require("./routes/login"))
app.use("/profile" , require("./routes/profile"))
app.use("/logout" , require("./routes/logout"))
app.use("/upload-by-link" , require("./routes/downloadLink"))
app.use("/uploads" , express.static(path.join(__dirname , "uploads")))

function getUserDataFromToken(req) {
    return new Promise((resolve , reject) => {
        jwt.verify(req.cookies.token, process.env.JWT_SECRET, (err, decodedUserData) => {
            if(err) {
                throw err ;
            }
            resolve(decodedUserData);
        })
    })
}

const photosMiddleware = multer({dest: "uploads/"})
app.post("/upload" ,photosMiddleware.array('photos' , 100), asyncHandler(async (req , res) => {
    const files = req.files;
    const uploadedFiles = [] ;

    for(let i = 0 ; i < files.length ; i++){
        const {path , originalname} = files[i];
        const parts = originalname.split('.') ;
        const extention = parts[parts.length - 1] ;
        const newPath = path + "." + extention;
        try {
            await fsPromises.rename(path , newPath) ;
        }catch(err) {
            console.error(err);
        }
        const responsePath = files[i].filename + "." + extention;
        uploadedFiles.push(responsePath);
    }
    return res.json(uploadedFiles);
}))
app.use('/upload-place' , require('./routes/uploadPlace'))

app.get("/places/:id", async (req,res) => {
    const {id} = req.params;
    const placeData = await Place.findById(id);
    return res.json(placeData);
})
app.use("/places" , require("./routes/places"))

app.post("/bookings" , async(req, res) => {

    const userData = await getUserDataFromToken(req) ;

    const {place ,checkIn , checkOut
        , numberOfGuests , name , mobile , price
    } = req.body;
    console.log(place , checkIn , checkOut);
    if(!place || !checkIn || !checkOut || !numberOfGuests  || !name || !mobile || !price){
        return res.status(400).json({message : "All fields are required"});
    }
    const createdBooking = await Booking.create({
        place ,checkIn , checkOut
        , numberOfGuests , name , mobile , price , user : userData.id  ,
    })
    console.log(createdBooking);
    if(createdBooking) {
        return res.status(200).json(createdBooking);
    }
    return res.status(400).json({message : "Booking not created"});
})

app.get("/bookings" , async (req,  res) => {
    const {token} = req.cookies ;

    if(!token) {
        return res.status(400).json({message : "No token provided"});
    }
    jwt.verify(token , process.env.JWT_SECRET, {} , async (err , decodedUserData) => {
        if(err) {
            throw err;
        }

        const bookingData = await Booking.find({user : decodedUserData.id}).populate("place");
        console.log(bookingData);
        if(bookingData){
            return res.status(200).json(bookingData);
        }
        return res.status(400).json({message : "No bookings found"}) ;
    })
})


//LISTENER AND MONGO CONNECTION AND ERROR
app.use(errMiddleware);
mongoose.connection.once("open" , () => {
    console.log("MongoDB Connected");
    app.listen(PORT , () => {
        console.log("App listening on port: " + PORT);
    })
})

mongoose.connection.on("error" , (err) => {
    console.log(err.stack);
    const message = `${err.number}\t${err.code}\t${err.syscall}\t${err.hostname} - ${err.message}\n`
    void logEvents(message , "mongoErrLog.log");
})
