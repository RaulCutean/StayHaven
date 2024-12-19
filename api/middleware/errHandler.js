const {logEvents} = require("./logger") ;





const errMiddleware = (err , req , res , next) => {
   void logEvents(`${err.name}\t${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}\n` , "errLog.log");
   console.log(err.stack);

   const status = res.statusCode ? res.statusCode : 500 ;
   res.status(status).json({message : err.message});
   next();
}



module.exports = errMiddleware;