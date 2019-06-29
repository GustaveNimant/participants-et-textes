const express = require("express");
const app = express();

const port_server = 3000;
const name_db = "node-demo-db";
const port_db = 27017;

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:" + port_db + "/" + name_db);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

const inscriptionSchema = new mongoose.Schema({
    email: String,
    pseudo: String,
    password : String
});

const Lecteur = mongoose.model("Lecteur", inscriptionSchema);

app.get("/inscription", (req, res) => {
    res.sendFile(__dirname + "/inscription.html");
});

app.post("/nouveau-lecteur", (req, res) => {
    var myData = new Lecteur(req.body);
    myData.save()
        .then(item => {
            res.send('Inscription OK <a href="/">Retour a l\'accueil</a>');
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});

app.get("/un-lecteur", (req, res) => {
    res.sendFile(__dirname + "/un-lecteur.html");
});

const inscriptionModel = mongoose.model('Lecteur', inscriptionSchema);

const query = inscriptionModel.find();
query.where('pseudo', 'Julien');
query.limit(3);

query.exec(function (err, the_inscriptions) {
    if (err) { throw err; }
    var an_inscription;
    console.log('length',the_inscriptions.length);
    
    for (var i = 0, l = the_inscriptions.length; i < l; i++) {
	an_inscription = the_inscriptions[i];
	
	console.log('------------------------------');
	console.log('Pseudo : ' + an_inscription.pseudo);
    }
});

const livreSchema = new mongoose.Schema({
    titreLivre: String,
    auteurLivre: String
});

const Livre = mongoose.model("Livre", livreSchema);

app.post("/nouveau-livre", (req, res) => {
    var myData = new Livre(req.body);
    myData.save()
        .then(item => {
            res.send('Name saved to database <a href="/">Retour a l\'accueil</a>');
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});

app.listen(port_server, () => {
    console.log("Server listening on port http://localhost:" + port_server);
});
