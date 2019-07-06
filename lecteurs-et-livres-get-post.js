const express = require("express");
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set ('view engine', 'ejs');

const db_config = require('./backend/models/db_config');
const port_server = db_config.SERVER_PORT;

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const Db_Promise = mongoose.connect(db_config.DB_URI, { useNewUrlParser: true })
    .then(
	() => {console.log('Database is connected to Uri', db_config.DB_URI)}
    )
    .catch ((error) => {
	console.log('Can not connect to the database');
	console.error(error);
    });

const lecteurModel = require('./backend/models/lecteurModel');
const livreModel = require('./backend/models/livreModel');

const router = express.Router();

// route middleware that will happen on every request
router.use(function(req, res, next) {
    console.log('la méthode du middleware est ',req.method, 'son url est', req.url);
    next(); 
});

router.get ('/', (req, res) => {
    res.render ('pages/index');
});

router.post('/nouveau-livre', (req, res) => {
    var nouveauLivre = new livreModel(req.body);
    nouveauLivre.save()
        .then(item => {
	    res.send('Le livre '+ req.body.titreLivre + ' a été enregistré dans la base de données <br><a href="/">Retour a l\'accueil</a>');
        })
        .catch(err => {
	    res.status(400).send("Impossible d'enregistrer le livre '+ req.body.titreLivre + ' dans la base de données");
        });
});

router.post('/nouveau-lecteur', (req, res) => {
    console.log('req.body', req.body);
    var nouveauLecteur = new lecteurModel(req.body);
    nouveauLecteur.save()
        .then(item => {
	    res.send('Le lecteur '+ req.body.pseudoLecteur + ' a été enregistré dans la base de données <br><a href="/">Retour a l\'accueil</a>');
        })
        .catch(err => {
	    res.status(400).send("Impossible d'enregistrer le lecteur '+ req.body.pseudoLecteur + ' dans la base de données");
        });
});

router.get('/Un-lecteur', function(req, res) {
    console.log('/Un-lecteur req.body est ', req.body);
    res.render ('pages/un-lecteur-post');
});

router.post('/Un-lecteur-post', function(req, res) {
    const pseudo = req.body.pseudoLecteur;
    console.log('1 req.body est ', req.body);
    console.log('1 Le pseudo est ', pseudo, '!');
  
    lecteurModel.findOne({
	pseudoLecteur: pseudo
    }).then(
	(a_reader) => {
	    console.log('1 a_reader is', a_reader);
	    if (a_reader) {
		res.render('pages/un-lecteur-get',
			   {
			       un_lecteur : a_reader,
			       title_tag: "Un lecteur",
			       title_page: "Les coordonnées d'un lecteur"
			   }
			  )
		// res.end ();
	    }
	    else {
		res.send('Le lecteur de pseudo '+ req.body.pseudoLecteur + ' n\'existe pas dans la base de données <br><br><a href="/">Retour a l\'accueil</a>');
	    }
	}
	).catch(
	    (error) => {
		res.status(404).json({
		    error: error
	    });
	    }
	);
    });

router.get('/Un-livre', function(req, res) {
    console.log('/Un-livre req.body est ', req.body);
    res.render ('pages/un-livre-post');
});

router.post('/Un-livre-post', function(req, res) {
    const titre = req.body.titreLivre;
    console.log('req.body est ', req.body);
    console.log('Le titre est ', titre, '!');
  
    livreModel.findOne({
	titreLivre: titre
    }).then(
	(a_book) => {
	    console.log('a_book is', a_book);
	    if (a_book) {
		res.render('pages/un-livre-get',
			   {
			       un_livre : a_book,
			       title_tag: "Un livre",
			       title_page: "Les coordonnées d'un livre"
			   }
			  )
		// res.end ();
	    }
	    else {
		res.send('Le livre de titre '+ req.body.titreLivre + ' n\'existe pas dans la base de données <br><br><a href="/">Retour a l\'accueil</a>');
	    }
	}
	).catch(
	    (error) => {
		res.status(404).json({
		    error: error
	    });
	    }
	);
    });

/* Lecteurs */
const lecteursRoute = require('./backend/routes/lecteurs.route')

router.get("/Les-lecteurs", lecteursRoute);

/* Livres */
const livresRoute = require('./backend/routes/livres.route')

router.get("/Les-livres", livresRoute);

// apply the routes to our application
app.use('/', router);

app.listen(port_server, () => {
    console.log("Server listening on port http://localhost:" + port_server);
});
