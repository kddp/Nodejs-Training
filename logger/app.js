//var path = require('path');
var winston = require('winston');




/*
//created custom logger
var logger = new (winston.Logger)({  
    transports: [
        new (winston.transports.Console)({ level: 'debug', timestamp: true }),
        new (winston.transports.File)({ filename: __dirname + '/../logs/my.log'})
    ]
});

logger.log('debug', 'logger for checking debug');
//daily logging
logger.add(winston.transports.DailyRotateFile, {datePattern: '.m', filename:  __dirname + '/../logs/daily.log'});

logger.info('Logs are being captured');
logger.info('Logs are being captured too many');
*/

winston.add(winston.transports.File, { filename:  __dirname + '/../logs/my.log' });

winston.log('info','Message','error');

