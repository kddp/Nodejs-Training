var nodeCouchDB = require("node-couchdb");
var couch = new nodeCouchDB();

couch.get("hello-world", "040c7159607f540d6e7898c65b065cba", function (err, resData) {
    if (err)
        return console.error(err);
    console.log(resData.data.item);
    console.log(resData.data.prices);
});

couch.get("hello-world", "040c7159607f540d6e7898c65b066a2b", function (err, resData) {
    if (err)
        return console.error(err);
    console.log(resData.data.item);
    console.log(resData.data.prices);
});

couch.get("hello-world", "040c7159607f540d6e7898c65b067170", function (err, resData) {
    if (err)
        return console.error(err);
    console.log(resData.data.item);
    console.log(resData.data.prices);
});