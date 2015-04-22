var path = require('path');
var winston = require('winston');

var transports  = [];

transports.push(new winston.transports.DailyRotateFile({
  name: 'file',
  datePattern: '.mm',
  filename: path.join(__dirname, "logs", "log_file.log")
}));

var logger = new winston.Logger({transports: transports});

// ... and logging
logger.info("log information", {extraData: 'some_value'});
logger.log("log information", {extraData: 'some more data'});