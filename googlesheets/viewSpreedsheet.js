var spreadsheet = require('edit-google-spreadsheet');

spreadsheet.load({
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
    });
