var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/node-demo");


var nameSchema = new mongoose.Schema({
    firstName: String,
    lastName: String
});
var User = mongoose.model("User", nameSchema);

app.get("/", (req, res) => {
    res.render('pages/index');
});

app.post("/addname", (req, res) => {
    var myData = new User(req.body);
    myData.save()
        .then(item => {
            res.send('Name saved to database <a href="/">Retour a l\'accueil</a>');
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});

var inscriptionSchema = new mongoose.Schema({
    email: String,
    pseudo: String,
    password : String
});
var Inscrit = mongoose.model("Inscrit", inscriptionSchema);

app.get("/Liste-mail-inscrits", function (req, res) {

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017";
   
    MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	var dbo = db.db("node-demo");
	dbo.collection('inscrits').find().toArray((err,result) => {
	    console.log("result :", result);
	    ;
	    var title_page = "Liste email des inscrits";
	    res.render('pages/liste-mail-inscrits', {
		inscrits: result,
		title_page: title_page,
	    });
	});
    });
   
}); 


app.get("/inscription", (req, res) => {
    res.render('pages/inscription');
});

app.post("/inscription", (req, res) => {
    var myData = new Inscrit(req.body);
    const pseudo = req.body.pseudo;    
    myData.save()
        .then(item => {
	    

	    res.send('Inscription OK <a href="/">Retour a l\'accueil</a>')
	    
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
    
 	    const url = require('url');
	    res.redirect (url.format({
		pathname : "/inscription",
		query : {
		    'inscription' : true,
		    'pseudo' : pseudo,
		}
	    }));
    db.close();
});

var inscriptionModel = mongoose.model('Inscrit', inscriptionSchema);


app.get("/supprimer-un-inscrit", function (req, res) {
    
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017";
   
    MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	var dbo = db.db("node-demo");
	dbo.collection('inscrits').find().toArray((err,result) => {
    
	    res.render('pages/supprimer-un-inscrit', {
		inscrits: result,
		deleted : false,
	    });
	    db.close();
	});
    });
});

app.post("/supprimer-un-inscrit", function(req, res) {
    const mail = req.body.email; // nom de l'input dans suppression-un-inscrit.html
    console.log ("Email : " + mail);
    
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017";
    
    MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	
	var dbo = db.db("node-demo");
	var myquery = { email: mail };
					 
	dbo.collection("inscrits").deleteOne(myquery, function(err, obj) {
	    if (err) throw err;
	    
	    console.log("1 document deleted : email ", mail);
	    

	});


	const url = require('url');
	res.redirect (url.format({
	    pathname : "/supprimer-un-inscrit",
	    query : {
		'deleted' : true,
	    }
	}));
	    db.close();	
    });
});


app.listen(port, () => {
    console.log("Server listening on port " + port);
});
