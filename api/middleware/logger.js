const fs = require("fs") ;
const fsPromises = require("fs").promises;
const path = require("path");
const {format} = require("date-fns")
const {v4 : uuid} = require("uuid");

const logEvents = async (message , fileName) => {
    const datetime = format(new Date() , "yyyy:MM:dd\tHH:mm:ss");
    const logItem = `${datetime}\t${uuid()}\t${message}`;
    try {
        if(!fs.existsSync(path.join(__dirname , ".." , "logs"))) {
            await fsPromises.mkdir(path.join(__dirname , ".." , "logs")) ;
        }
        await fsPromises.appendFile(path.join(__dirname , ".." , "logs" , fileName) , logItem);
    } catch(err) {
        console.log(err);
    }
}
const logger = (req , res , next) => {
    const message = `${req.method}\t${req.url}\t${req.headers.origin}\n`
    void logEvents(message, "logEvents.log")
    console.log(message);
    next();
}
module.exports = {logEvents, logger};