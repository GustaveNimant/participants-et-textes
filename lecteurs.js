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

const query = lecteurModel.find();
query.exec(function (err, les_lecteurs) {
    if (err) { throw err; }
    var un_lecteur;
    console.log('length',les_lecteurs.length);
    
    for (var i = 0, l = les_lecteurs.length; i < l; i++) {
	un_lecteur = les_lecteurs[i];
	
	console.log('------------------------------');
	console.log('Pseudo : ' + un_lecteur.pseudo);
    }
});

app.get("/les-lecteurs", function (req, res) {
    var title_page = "La liste des lecteurs";
    var query = lecteurModel.find();
    console.log('query', query);
    var lecteur_c = db.collections('lecteur_c');
    res.render('pages/les-lecteurs', {
	lecteur_a : query,
	title_page: title_page}
	      )
}
       );

app.listen(port_server, () => {
    console.log("Server listening on port http://localhost:" + port_server);
});
