var express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose =
        require("passport-local-mongoose"),
    User = require("./models/user");
Contact = require("./models/contact");
UserData = [];
contactData = [];

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://0.0.0.0/node-mongodb";
var ObjectId = require('mongodb').ObjectId;
mongoose.connect('mongodb://0.0.0.0/node-mongodb');


var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.use(require("express-session")({
    secret: "Rusty is a dog",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Name :- Aagam Shah
// Student Id :- 301225588
// Date: 20 Oct 2022

// Showing home page
app.get('/', function (req, res, next) {
    if (UserData && UserData.length > 0) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("node-mongodb");
            dbo.collection("contact").find({}).sort({ name: 1 }).toArray(function (err, result) {
                if (err) throw err;
                contactData = result;
                res.render("home", { data: contactData, tilte: "Business Contact List View" });
                db.close();
            });
        });
    }
    else { res.redirect('/login'); }
});



//Showing login form
app.get("/login", function (req, res) {
    res.render("login", { title: 'login' });
});

app.get("/index", function (req, res) {
    res.render("index", { title: 'Information' });
});

app.get("/about", function (req, res) {
    res.render("about", { title: 'About Me' });
});

app.get("/contact", function (req, res) {
    res.render("contact", { title: 'Contact Me' });
});

app.get("/projects", function (req, res) {
    res.render("projects", { title: 'Projects' });
});

app.get("/services", function (req, res) {
    res.render("services", { title: 'Services' });
});

app.post("/update", function (req, res) {
    var id = req.body._id;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("node-mongodb");
        dbo.collection("contact").updateOne({ "_id": new ObjectId(id) }, { $set: { name: req.body.name, email: req.body.email, contactNumber: req.body.contactNumber } }, { upsert: true }, function (err, result) {
            db.close();
        });
    });

    res.redirect('/', { title: 'Information' });
});

app.get("/update/:id", function (req, res) {
    var id = req.params.id;
    if (UserData && UserData.length > 0) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("node-mongodb");
            dbo.collection("contact").find({ "_id": new ObjectId(id) }).sort({ name: 1 }).toArray(function (err, result) {
                if (err) throw err;
                res.render("update", { data: result });
                db.close();
            });
        });
    }
    else { res.redirect('/login'); }
});

//Handling user login
app.post("/login", function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("node-mongodb");
        dbo.collection("user").find({ name: req.body.username, password: req.body.password }).sort({ name: 1 }).toArray(function (err, result) {
            if (err) throw err;
            if (result && result.length > 0) {
                UserData = result;
                res.redirect('/');
                db.close();
            }
            else {
                res.redirect('/login');
            }
        });
    });
});

//Handling user logout
app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});

// app.set('port', (process.env.PORT || 3000));

// // Start node server
// app.listen(app.get('port'), function () {
//     console.log('Node server is running on port ' + app.get('port'));
// });

var server_port = process.env.YOUR_PORT || process.env.PORT || 3000;
var server_host = process.env.YOUR_HOST || '0.0.0.0';
server.listen(server_port, server_host, function () {
    console.log('Listening on port %d', server_port);
});

res.listen(process.env.PORT || 3000)

kaWEWTRAQ671app.get('/delete/:id', function (req, res, next) {
    var id = req.params.id;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("node-mongodb");

        dbo.collection("contact").deleteOne({ "_id": new ObjectId(id) }, function (err, result) {
            db.close();
        });
    });

    res.redirect('/');
});
