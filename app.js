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
console.log('app.get db', db);

app.get ('/', (req, res) => {
    console.log('app.get req.session is', req.session);
    res.render ('pages/index');
});

const lecteurModel = require('./backend/models/lecteurModel');

app.get("/nouvelle-inscription", (req, res) => {
    res.sendFile(__dirname + "/inscription.html");
});

app.post("/nouveau-lecteur", (req, res) => {
    var nouveauLecteur = new lecteurModel(req.body);
    nouveauLecteur.save()
        .then(item => {
            res.send('Inscription effectuée <a href="/">Retour a l\'accueil</a>');
        })
        .catch(err => {
            res.status(400).send("Impossible d'enregistrer le nouveau lecteur dans la database");
        });
});

app.get("/un-lecteur", (req, res) => {
    console.log('un-lecteur req.body', req.body);
    res.sendFile(__dirname + "/un-lecteur.html");
});

//const lecteurModel = mongoose.model('lecteurModel', lecteurSchema);

const query = lecteurModel.find();
console.log('query', query);
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

const livreModel = require('./backend/models/livreModel');

app.post("/nouveau-livre", (req, res) => {
    var nouveauLivre = new livreModel(req.body);
    nouveauLivre.save()
        .then(item => {
            res.send('Nouveau livre enregistré dans la base de données <a href="/">Retour a l\'accueil</a>');
        })
        .catch(err => {
	    res.status(400).send("Impossible d'enregistrer le nouveau livre dans la base de données");
        });
});

app.use('/les-livres', (req, res, next) => {
    livreModel.find().then( /* returns a promise */
	(livres) => {
	 // var title = (livres[0]).titreLivre;
	    console.log('nombre de livres',livres.length);
	    for (var i = 0, l = livres.length; i < l; i++) {
		un_livre = livres[i];
		console.log('------------------------------');
		console.log('Titre : ' + un_livre.titreLivre);
	    }
/* res.status(200).json(livres); */
	}
    ).catch(
	(error) => {
	    res.status(400).json({
		error: error
	    });
	}
    );
//  next();
});

app.get('/les-livres', (req, res) => {
    res.render("/les-livres");
});

app.delete("/les-livres/:id", (req, res, next) => {
    livreModel.delete({_id:req.params.id})
	.then (
	    () => {
	    }
	).catch(
	    (error) => {
		res.status(400).json({
		    error: error
		});
	    }
	);
});

app.listen(port_server, () => {
    console.log("Server listening on port http://localhost:" + port_server);
});
