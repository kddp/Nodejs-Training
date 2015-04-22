module.exports = {
	//database configuration
	couchIP: 'localhost',
	couchPort: '5984',
	dbName: 'couchdemo',

	//email server details
	user: 'nag.abhi2006@gmail.com',
	clientId: '780120602790-7er43b0m89r8h7q4ov4gdugkg1dsmq63.apps.googleusercontent.com',
    clientSecret: '9AvPrkVvZUpuB3DVjkNs1PQR',
    refreshToken: '1/RXDa82_gVXlCtXHWn4KjcFDH8QGXAhbH-BFJdBuZj0oMEudVrK5jSpoR30zcRFq6',
	
	//email
	from: 'Abhishek', 
	to: 'nag.abhi2006@gmail.com', 
	subject: 'Weather Request Delay logger',
	mailBodyPre: '<h3>Weather Request Delay logger</h3><br/><b><Hello!!!></b></br>The flight number',
	mailBodyPost: 'could not respond in the specified time.<br><br>We will keep you updated for the same.',
	
	//email service 
	service: 'gmail',
	maxConnections: '10',
	maxMessages: '10',
	email: '780120602790-k2dk9s8lfoqnp19724f4udej91tau11t@developer.gserviceaccount.com',
    key: 'my.pem',
    
    //spreedsheet details
    sheetName: 'Test',
    worksheet:'Sheet1', 
    spreadsheetId: '1xWZtYxwlvR-tN_6JzSA7gx8c6KbA1Jm4c2bHZ793_wQ',
  	worksheetId: 'od6',
  	
  	//file logger path
  	logFilePath : '/home/abhisheknag/nodejs/logs/my.log',

  	//threshold time in milliseconds
	thresholdTime : '30000'
};
