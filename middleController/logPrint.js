const { format } = require('date-fns');
const { v4: uuid } = require('uuid');


const fs = require('fs');
const fsPromise = require('fs').promises;
const path = require('path');

const logPrint = async (message, logName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem =  `${dateTime}\t${uuid()}\t${message}\n`;
    console.log(logItem);
    try{
        if(!fs.existsSync(path.join(__dirname,'..','Logs'))) {
            await fsPromise.mkdir(path.join(__dirname,'..', 'Logs'));
        }
        //testing
        await fsPromise.appendFile(path.join(__dirname,  'Logs','..', logName), logItem);

    }
    catch (err){
        console.log(err);
    }
}

const logger = (req, res, next) => {
    logPrint(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
    console.log(`${req.method} ${req.path}`);
    next();
}

module.exports = { logger, logPrint };