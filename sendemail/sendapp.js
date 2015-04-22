/**
*@module email nodejs module emailjs
*
*
*/
var email   = require("emailjs");

/**
*@module email-nodejs module emailjs
*@method server
*@param {object} credentials
*
*
*/

var server  = email.server.connect({
   user:    "username", 
   password:"password", 
   host:    "smtp.your-email.com", 
   ssl:     true
});

server.send({
   text:    "i hope this works", 
   from:    "nag.abhi2006@gmail.com", 
   to:      "nag.abhi2006@gmail.com>,",
   subject: "testing emailjs"
}, function(err, message) { console.log(err || message); });