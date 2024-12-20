const allowedOrigins = require("./allowedOrigins")


const corsOptions = {
    origin :  function(origin , callback) {
        if(allowedOrigins.indexOf(origin) !== -1 || !origin){
             callback(null , origin);
        }else {
            callback(new Error("Not allowed by CORS"))
        }
    } ,
    credentials : true ,
    optionsSuccessStatus: 204  ,
}

module.exports = corsOptions ;