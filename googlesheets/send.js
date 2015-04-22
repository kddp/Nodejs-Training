var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
            host: 'a2s65.a2hosting.com',
            port: 587,
            auth: {
                user: 'suresh@simpragma.com',
                pass: 'snh12345$'
            },            
            /*authMethod:'NTLM',*/
            secure:false,
            tls: {rejectUnauthorized: false},
            debug:true,
            greetingTimeout:30000
        }
    );

var mailOptions = {
    from: 'suresh@simpragma.com',
    to: ['suri.hosur@gmail.com','abhishek@simpragma.com'],
    subject: 'Test Mail',
    text: 'Send mail using nodemailer'
};

transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log('Message sent: ' + info.response);
    }
});