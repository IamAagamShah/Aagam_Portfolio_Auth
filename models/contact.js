var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://0.0.0.0/node-mongodb";

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  var dbo = db.db("node-mongodb");

  var myobj = [
    { contactName: 'Whitecap Canada', email: 'www.whitecapcanada.com', contactNumber: '+1 855-393-9977' },
    { contactName: 'Evenset', email: 'evenset.com', contactNumber: '+1 647-770-4441' },
    { contactName: 'RootQuotient', email: 'rootquotient.com', contactNumber: '+1 647-374-5600' },
    { contactName: 'Synic Software Inc.', email: 'www.synicsw.com', contactNumber: '+1 778-244-8621' },
    { contactName: 'AIVIA Inc.', email: 'www.aivia.ca', contactNumber: '+1 780-481-5444' },
  ];
  var data = dbo.collection("contact").find({}).toArray();
  if (!data) {
    dbo.collection("contact").insertMany(myobj, function (err, res) {
      if (err) throw err;
      console.log("Number of documents inserted: " + res.insertedCount);
    });
  }
});
