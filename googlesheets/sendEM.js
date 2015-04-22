var nodemailer = require('nodemailer');


var smtpTransport = nodemailer.createTransport("SMTP", {
  service: "Gmail",
  auth: {
    XOAuth2: {
      user: "nag.abhi2006@gmail.com", // Your gmail address.
                                      // Not @developer.gserviceaccount.com
      clientId: "780120602790-7er43b0m89r8h7q4ov4gdugkg1dsmq63.apps.googleusercontent.com",
      clientSecret: "9AvPrkVvZUpuB3DVjkNs1PQR",
      refreshToken: "1/RXDa82_gVXlCtXHWn4KjcFDH8QGXAhbH-BFJdBuZj0oMEudVrK5jSpoR30zcRFq6"
    }
  }
});

var transport = nodemailer.createTransport(smtpPool({
    service: 'gmail',
    auth: {
        xoauth2: generator
    },
    maxConnections: 5,
    maxMessages: 10
}));
/*
// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'abhishek.nag2811@gmail.com',
        pass: '----'
    }
});
*/

// setup e-mail data with unicode symbols
var mailOptions = {
    from: 'Abhishek Nag', // sender address
    to: 'nag.abhi2006@gmail.com', // list of receivers
    subject: 'Hello', // Subject line
    text: 'Hello world!!!', // plaintext body
    html: '<b>Hello world </b>' // html body
};

transport.sendMail(mailOptions, function(error, response) {
  if (error) {
    console.log(error);
  } else {
    console.log(response);
  }
  smtpTransport.close();
});