var nano = require('nano')('http://localhost:5984');

//accessing db name hello-world from couchdb
var hello = nano.use('couchmail');

hello.list(function(err, body) {
  if (!err) {
    console.log(body.total_rows);
    body.rows.forEach(function(doc) {
      //console.log("DOC",d);
          /*console.dir(doc.id);
          var ids = doc.id;
          hello.get(ids, function(err, data)
          { 
            console.dir(data.item);
            console.dir(data.item + " requestTime: " + data.requestTime);
            console.dir(data.item + " responseTime: " + data.responseTime);
            
            if((data.responseTime - data.requestTime) > 3)
              console.dir("SMS sent...");
            else
              console.dir("Every is OK...");
        });*/
      });
  }
});


