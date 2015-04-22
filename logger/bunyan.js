var bunyan = require('bunyan');
var logger = bunyan.createLogger({
    name : 'logger',
    streams : [{
		      	stream: process.stdout            	//log to stdout
		    },
		    {
		       	type: 'rotating-file',				
		        path: 'parse.log',					//log file path
		        period: '1w',  						//daily rotation
		      	//count: 3	        				//keep 3 back copies
		    }]
});

logger.info('Test1');
logger.error('Error happend');