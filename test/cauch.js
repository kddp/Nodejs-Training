var http = require('http')
var sys = require('sys')
request = require('request')

var couchdbPath = 'http://localhost:5984/'

//get all the DB
h = {accept: 'application/json', 'content-type': 'application/json'}

option = {
  uri: couchdbPath + '_all_dbs',
  headers: h,
  method: 'GET'
};

call = function(err, response, body) { 
  console.log(sys.inspect(JSON.parse(body))); 
};

request(option, call);

/*
// add database
request(
  {uri: couchdbPath + 'dbname', method:'PUT', headers:h},
  function (err, response, body) {
    if (err)
      throw err;
    if (response.statusCode !== 201)
      throw new Error("Could not create database. " + body);
  }
)

// Modify existing document
var options = {
  host: "localhost",
  port: 5984,
  path: "/dbname",
  headers: {"content-type": "application/json"},
  method: "PUT"
};

var req = http.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  //console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

// write data to request body
req.write(JSON.stringify({
  "_id":"rabbit",
  "_rev":"4-8cee219da7e61616b7ab22c3614b9526",
  "Subject":"I like Plankton"
}));

req.end();
*/