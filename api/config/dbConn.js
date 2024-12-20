const mongoose = require('mongoose');


const dbConn = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI) ;
        console.log("Connected to MongoDB");
    }catch(err){
        console.log(err) ;
    }
}

module.exports = dbConn;