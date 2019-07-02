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

const livreModel = require('./backend/models/livreModel');

const livres_query = livreModel.find();

var livre_list = [
    {
	titreLivre: "",
	auteurLivre: ""
    }
];
     
livres_query.exec(function (err, les_livres) {
    if (err) { throw err; }
    var un_livre;
    console.log('length', les_livres.length);

    livre_list = les_livres; 
 });

app.get("/Les-livres", function (req, res) {
    var title_tag = "Les livres";
    var title_page = "La liste des livres";
    res.render('pages/les-livres',
	       {
		   livres : livre_list,
		   title_tag: title_tag,
		   title_page: title_page
	       }
	      )
});

app.listen(port_server, () => {
    console.log("Server listening on port http://localhost:" + port_server);
});
