var notifier = require('mail-notifier');

var imap = {
  user: "nag.abhi2006@gmail.com",
  password: "jeuctdljehqiqrur",
  host: "imap.gmail.com",
  port: 993, // imap port
  tls: true,// use secure connection
  tlsOptions: { rejectUnauthorized: false }
};
 
 notifier(imap).on('mail',function(mail)
						{
							console.log("FROM:",mail.from);
							console.log("TO:",mail.to);
							console.log("SUBJECT:",mail.subject);
							console.log("MAIL BODY:",mail.text);
							console.log("TIME:",mail.date);

						}).start();