 var Spreadsheet = require('edit-google-spreadsheet');
 var nano = require('nano')('http://localhost:5984');
 
 //accessing db hello-world from couchdb
 var hello = nano.use('hello-world');

 var list = new Array();

 //accessing couchdb and getting all the data and storing to list array(array of objects)
  hello.list(function(err, body) {
      if (!err) {
        body.rows.forEach(function(doc) {
          //console.log(doc.id);
              var ids = doc.id;
              hello.get(ids, function(err, data)
              { 
                console.dir(data.item + " requestTime: " + data.requestTime);
                console.dir(data.item + " responseTime: " + data.responseTime);
                
                if((data.responseTime - data.requestTime) > 3)
                {
                  console.dir("SMS sent...");
                  var col = new Object();
                  col.item = data.item;
                  col.requestTime = data.requestTime;
                  col.responseTime = data.responseTime;
                  list.push(col);
                  console.dir(list);

                }    
                else
                  console.log("Every is OK...");
            });
          });
      }
    });


  var rowN = 
  Spreadsheet.load({
    debug: true,
    spreadsheetName: 'Test',
    worksheetName: 'Sheet1',
    
    oauth : {
        email: '780120602790-k2dk9s8lfoqnp19724f4udej91tau11t@developer.gserviceaccount.com',
        keyFile: 'my.pem'
        }
    }, 

    function sheetReady(err, spreadsheet) {
      if (err) {
        throw err;
      } 

      //view spreadsheet
      spreadsheet.receive(function(err, rows, info) {
        if (err) {
          throw err;
        }
        console.dir(rows);
        console.dir(info);
      });
      

      //iterating over array of items objects and adding to spreadsheet
      var itemNum=0;
      for(var row = 3; row <= list.length+2; row++)
      { 
          var colNum = 1;

          var rowNum1 = {};
          rowNum1[row] = {}; 
          rowNum1[row][colNum++] = list[itemNum].item;

          var rowNum2 = {};
          rowNum2[row] = {};
          rowNum2[row][colNum++] = list[itemNum].requestTime;

          var rowNum3 = {};
          rowNum3[row] = {};
          rowNum3[row][colNum++] = list[itemNum++].responseTime;
                    
          console.dir(rowNum1);
          console.dir(rowNum2);
          console.dir(rowNum3);     

          spreadsheet.add(rowNum1);  
          spreadsheet.add(rowNum2);  
          spreadsheet.add(rowNum3);    
          
          /*
          //adding manually to the speadsheet
          spreadsheet.add({2: {1:list[0].item} });
          spreadsheet.add({2: {2:list[0].requestTime} });
          spreadsheet.add({2: {3:list[0].responseTime} });

          spreadsheet.add({3: {1:list[1].item} });
          spreadsheet.add({3: {2:list[1].requestTime} });
          spreadsheet.add({3: {3:list[1].responseTime} });

          spreadsheet.add({4: {1:list[2].item} });
          spreadsheet.add({4: {2:list[2].requestTime} });
          spreadsheet.add({4: {3:list[2].responseTime} });

          spreadsheet.add({5: {1:list[3].item} });
          spreadsheet.add({5: {2:list[3].requestTime} });
          spreadsheet.add({5: {3:list[3].responseTime} });
          */
          spreadsheet.send(function(err) {
            if(err) throw err;
            console.log("Updated added!!!'");
        });
      }
  });