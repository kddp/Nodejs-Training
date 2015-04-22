/**
 *module            weatherRequestDelayLogger
 *description       This module is used with the weather request module to NAVTECH
 *                  If thier is no response from NAVTECH after a weather request is made, 
 *                  this module sends an email to all stake holders & logs to google spreedsheet.
 *              
 *                  Note: I have used my gmail id.Also I have used database name couchdemo
 *                  in couchdb for demo purpose.
 *        
 *                  @Link to my google-spreedsheet:
 *                  https://docs.google.com/spreadsheets/d/1xWZtYxwlvR-tN_6JzSA7gx8c6KbA1Jm4c2bHZ793_wQ/edit#gid=0              
 *
 *usage             run in command line as node <module>
 *author            Abhishek
 *date              Dec 1, 2014
 *
 *Revision History
 *Date                  Version                 Author                  Description
 *Dec 1, 2014           v1.0                    Abhishek                Initial release
 *
 */

 // loading configured json file
 var config = require('./config2.json');     

 //module to access google spreedsheet
 var spreadsheet = require('edit-google-spreadsheet');   

 //module to access couchDB    
 var nano = require('nano')('http://' + config.database.couchIP + ':' + config.database.couchPort);  
 
 //module to send email
 var nodemailer = require('nodemailer');

 //module to send e-mails using smtp
 var smtpPool = require('nodemailer-smtp-pool');            

 //module to log
 var winston  = require('winston');                         

 winston.add(winston.transports.File, { filename: config.logFilePath.path });   //creating file logger
 
//generator holds module xoauth2 login tokens from provided client and user credentials.
var generator = require('xoauth2').createXOAuth2Generator({
                                user : config.xoauth2.user,                   //User e-mail address
                                clientId : config.xoauth2.clientId,           //Client ID value
                                clientSecret : config.xoauth2.clientSecret,   //Client secret value
                                refreshToken : config.xoauth2.refreshToken    //Refresh token for an user
                              });

//creating reusable transport for sending email using SMTP.
var transport = nodemailer.createTransport(smtpPool({
                    service : config.transport.service,                       //Built in service
                    auth: {
                            xoauth2: generator
                          },
                    maxConnections : config.transport.maxConnections, 
                    maxMessages : config.transport.maxMessages
                  }));
 
 //specify the database we are going to use.
 var databaseFromCouchDB = nano.use(config.database.dbName);
 
 //accessing couchDB and getting all the weather request record and storing to listOfWeatherRequest
 var listOfWeatherRequest = new Array();

  databaseFromCouchDB.list(function(err, body) 
  {
      if (err) 
      {
          winston.log('error',err.message);
          return;
      }
      else
      {
          body.rows.forEach(function(doc) {
          var weatherRequestID = doc.id;

          //for each weatherRequestID list all weather request data
          databaseFromCouchDB.get(weatherRequestID, function(err, WRdata)
          {           
            
            var temp_datetime;
            //if response_datetime is undefined or null, then considering current time as an response_datetime.
            if(typeof WRdata.response_datetime === 'undefined' || WRdata.response_datetime.length === 0)
            {
              WRdata.request_datetime = new Date(WRdata.request_datetime);
              WRdata.temp_datetime = "";
              WRdata.response_datetime = new Date();
            }
            else
            {
              WRdata.request_datetime = new Date(WRdata.request_datetime);
              WRdata.temp_datetime = new Date(WRdata.response_datetime).toISOString();
              WRdata.response_datetime = new Date(WRdata.response_datetime);
            }

            //checking if (response_datetime - request_datetime) > threshold time, then send email and add to spreedsheet
            if(((WRdata.response_datetime - WRdata.request_datetime) > config.thresholdTime) && (!WRdata.turnAroundTime))
            {
              sendEmail(WRdata, transport);
            }    
            else
            {
                //difference between response_datetime & request_datetime is < threshold time
            } 

            //adding new field to existing weather request data, so that next time only new records will be checked
            updateTurnAroundTime(WRdata, databaseFromCouchDB);

          });
        });
      }
  });

//loading the spreedsheet
spreadsheet.load({
  debug: true,
  spreadsheetId : config.sheetDetails.spreadsheetId,        //Spreedsheet ID
  worksheetId : config.sheetDetails.worksheetId,            //Worksheet ID
  spreadsheetName : config.sheetDetails.sheetName,          //Name of the spreedsheet
  worksheetName: config.sheetDetails.worksheet,             //Name of the worksheet
  oauth : {
            email: config.oauth.email,
            keyFile: config.oauth.key
          }
  }, 

  function sheetReady(err, spreadsheet) 
  {
    if (err) 
    {
      winston.log('error',err.message);
      return;
    } 

    //get the spreadsheet
    spreadsheet.receive(function(err, rows, info) {
      if (err) 
      {
        winston.log('error',err.message);
        return;
      }

      //next row in the spreedsheet where the new records will be updated
      var nextRow = info.nextRow;

      //iterating over the array of listOfWeatherRequest and adding to spreedsheet      
      updateSpreadsheet(spreadsheet,listOfWeatherRequest,nextRow);
      });
  });


function sendEmail(WRdata, transport){
              console.log("Send Email");

              WRdata.turnAroundTime = (WRdata.response_datetime - WRdata.request_datetime);        
              WRdata.response_datetime = WRdata.temp_datetime;

              listOfWeatherRequest.push(WRdata);

              // send mail using defined transport object
              var mailOptions = {
                    from : config.mail.from,                          //Sender name
                    to : config.mail.to ,                             //Receiver email
                    subject : config.mail.subject,                    //Subject of the email
                    html : config.mail.mailBodyPre + WRdata.flight_no + config.mail.mailBodyPost        //Email body in html format
                  };
             
              transport.sendMail(mailOptions, function(error, response) {
                if (error || undefined) 
                {
                  winston.log('error',error.message);       //Logging if fail to send email
                  return;
                } 
                else 
                {
                  console.log(response);
                }
                transport.close();
              });
}

function updateTurnAroundTime(WRdata, databaseFromCouchDB){
            if(typeof WRdata.turnAroundTime)
            {
              //adding addition field to existing document   
              WRdatap.turnAroundTime = (WRdata.response_datetime - WRdata.request_datetime); 
              WRdata.response_datetime = temp_datetime;
              databaseFromCouchDB.insert(WRdata, WRdata._id, function(err, body, header) 
              {
                if (err) 
                {
                  winston.log('error',err.message); 
                  return;
                }
              });
            }
}


function updateSpreadsheet(spreadsheet,listOfWeatherRequest,nextRow){
      var recordNum = 0; 
      for(var row = nextRow; row <= (listOfWeatherRequest.length+nextRow-1); row++)
      { 
          var colNum = 1;
            
          var rowNum1 = {};
          rowNum1[row] = {}; 
          rowNum1[row][colNum++] = listOfWeatherRequest[recordNum].orig_apt;

          var rowNum2 = {};
          rowNum2[row] = {}; 
          rowNum2[row][colNum++] = listOfWeatherRequest[recordNum].dest_apt;

          var rowNum3 = {};
          rowNum3[row] = {}; 
          rowNum3[row][colNum++] = listOfWeatherRequest[recordNum].subject;

          var rowNum4 = {};
          rowNum4[row] = {};
          rowNum4[row][colNum++] = listOfWeatherRequest[recordNum].request_datetime.toISOString();

          var rowNum5 = {};
          rowNum5[row] = {};
          rowNum5[row][colNum++] = listOfWeatherRequest[recordNum].response_datetime;

          var rowNum6 = {};
          rowNum6[row] = {};
          rowNum6[row][colNum++] = listOfWeatherRequest[recordNum].turnAroundTime;

          var rowNum7 = {};
          rowNum7[row] = {};
          rowNum7[row][colNum++] = listOfWeatherRequest[recordNum].arrival_time_UTC;

          var rowNum8 = {};
          rowNum8[row] = {};
          rowNum8[row][colNum++] = listOfWeatherRequest[recordNum].departure_time_UTC;

          var rowNum9 = {};
          rowNum9[row] = {};
          rowNum9[row][colNum++] = listOfWeatherRequest[recordNum].flight_arr;

          var rowNum10 = {};
          rowNum10[row] = {};
          rowNum10[row][colNum++] = listOfWeatherRequest[recordNum].flight_dep;

          var rowNum11 = {};
          rowNum11[row] = {};
          rowNum11[row][colNum++] = listOfWeatherRequest[recordNum].flight_date;

          var rowNum12 = {};
          rowNum12[row] = {};
          rowNum12[row][colNum++] = listOfWeatherRequest[recordNum].flight_no;

          var rowNum13 = {};
          rowNum13[row] = {};
          rowNum13[row][colNum++] = listOfWeatherRequest[recordNum].regn_no;

          var rowNum14 = {};
          rowNum14[row] = {};
          rowNum14[row][colNum++] = listOfWeatherRequest[recordNum].alt_apts.toString();

          var rowNum15 = {};
          rowNum15[row] = {};
          rowNum15[row][colNum++] = listOfWeatherRequest[recordNum].request_type;

          var rowNum16 = {};
          rowNum16[row] = {};
          rowNum16[row][colNum++] = listOfWeatherRequest[recordNum].parent_request.toString()+" ";

          var rowNum17 = {};
          rowNum17[row] = {};
          rowNum17[row][colNum++] = listOfWeatherRequest[recordNum++].processed.toString()+" ";
           
          spreadsheet.add(rowNum1);    
          spreadsheet.add(rowNum2);
          spreadsheet.add(rowNum3);
          spreadsheet.add(rowNum4);
          spreadsheet.add(rowNum5);
          spreadsheet.add(rowNum6);
          spreadsheet.add(rowNum7);
          spreadsheet.add(rowNum8);    
          spreadsheet.add(rowNum9);
          spreadsheet.add(rowNum10);
          spreadsheet.add(rowNum11);
          spreadsheet.add(rowNum12);
          spreadsheet.add(rowNum13);
          spreadsheet.add(rowNum14);
          spreadsheet.add(rowNum15);
          spreadsheet.add(rowNum16);
          spreadsheet.add(rowNum17);
    
          spreadsheet.send(function(err) 
          {
            if(err)
            {
              winston.log('error',err.message);   //logging if failed to write to spreedsheet
              return;
            }
          });
        }
}
/* end of the script */