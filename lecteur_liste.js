const express = require("express");
const app = express();

const port_server = 3000;
const name_db = "lecteurs-et-livres-db";
const port_db = 27017;

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Moteur de template
app.set ('view engine', 'ejs');

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:" + port_db + "/" + name_db, { useNewUrlParser: true });

const db = mongoose.connection;

app.get ('/', (req, res) => {
    res.render ('pages/index');
});

const lecteurModel = require('./backend/models/lecteurModel');

const lecteurs_query = lecteurModel.find();

var lecteur_list = new Array ();
     
lecteurs_query.exec(function (err, les_lecteurs) {
    if (err) { throw err; }
    var un_lecteur;
    console.log('length',les_lecteurs.length);

    lecteur_list = les_lecteurs; 
 });

app.get("/Les-lecteurs", function (req, res) {
    var title_tag = "Les lecteurs";
    var title_page = "La liste des lecteurs";
    res.render('pages/les-lecteurs',
	       {
		   lecteurs : lecteur_list,
		   title_tag: title_tag,
		   title_page: title_page
	       }
	      )
});

app.listen(port_server, () => {
    console.log("Server listening on port http://localhost:" + port_server);
});
