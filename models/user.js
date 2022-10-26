var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://0.0.0.0/node-mongodb";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("node-mongodb");

    var myobj = [
        { name: 'Nupur Shah', email: 'nupur.shah@gmail.com', password: 'password1231' },
        { name: 'Aagam Shah', email: 'aagam.shah@gmail.com', password: 'password1232' },
        { name: 'Prachi Shah', email: 'prachi.shah@gmail.com', password: 'password1233' },
        { name: 'Vedant shah', email: 'vedant.shah@gmail.com', password: 'password1234' },
        { name: 'Harsha shah', email: 'harsha.shah@gmail.com', password: 'password1235' },
    ];
    // var data = dbo.collection("user").find({}).toArray();
    // if (!data) {
    dbo.collection("user").insertMany(myobj, function (err, res) {
        if (err) throw err;
        console.log("Number of documents inserted: " + res.insertedCount);
    });
    //}
});
