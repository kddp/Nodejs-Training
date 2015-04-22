var nodemailer = require('nodemailer');
var smtpPool = require('nodemailer-smtp-pool');

var generator = require('xoauth2').createXOAuth2Generator({
                                user: "nag.abhi2006@gmail.com", // Your gmail address.
                                                                // Not @developer.gserviceaccount.com
                                clientId: "780120602790-7er43b0m89r8h7q4ov4gdugkg1dsmq63.apps.googleusercontent.com",
                                clientSecret: "9AvPrkVvZUpuB3DVjkNs1PQR",
                                refreshToken: "1/RXDa82_gVXlCtXHWn4KjcFDH8QGXAhbH-BFJdBuZj0oMEudVrK5jSpoR30zcRFq6"
                        });

// listen for token updates
// you probably want to store these to a db
generator.on('token', function(token){
    console.log('New token for %s: %s:', token.user, token.accessToken);
});

var transport = nodemailer.createTransport(smtpPool({
                    service: 'gmail',
                    auth: {
                            xoauth2: generator
                          },
                    maxConnections: 1,
                    maxMessages: 1
                }));

var emails = ['nag.abhi2006@gmail.com'];
var message = 'Hello world';
var emailBody = '<h1>Hello World</h1><br/><b><Hello!!!></b></br>This mail is from nodemailer.'

var mailOptions = {
                        from: 'Abhishek Nag', // sender address
                        to: emails , // list of receivers
                        subject: 'Sending Email Using NodeJS', // Subject line
                        text: 'Hello!!!', // plaintext body
                        html: emailBody // html body
                  };

transport.sendMail(mailOptions, function(error, response) {
  if (error) {
    console.log(error);
  } else {
    console.log(response);
  }
  transport.close();
});