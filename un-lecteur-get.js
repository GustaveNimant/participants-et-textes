const express = require("express");
const app = express();

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

const router = express.Router();

// route middleware that will happen on every request
router.use(function(req, res, next) {
    console.log('la méthode du middleware est ',req.method, 'son url est', req.url);
    next(); 
});

router.get ('/', (req, res) => {
    res.render ('pages/index');
});

router.get('/Un-lecteur', function(req, res) {
    res.send('Je suis sur la page Un-lecteur'); 
});

// route middleware to validate :pseudo
router.param('pseudo', function(req, res, next, pseudo) {
    console.log('pseudo est ' + pseudo);
    req.pseudo = pseudo;
    next(); 
});

router.get('/Ici/:pseudo', function(req, res) {
    res.send('Le pseudo est ' + req.pseudo + '!');
});

router.get('/Un-lecteur/:pseudo', function(req, res) {
    lecteurModel.findOne({
	pseudo: req.pseudo
    }).then(
	(a_reader) => {
	    console.log('a_reader is', a_reader);
	    res.render('pages/un-lecteur-get',
		       {
			   un_lecteur : a_reader,
			   title_tag: "Un lecteur",
			   title_page: "Les coordonnées d'un lecteur"
		       }
		      )
	}
    ).catch(
	(error) => {
	    res.status(404).json({
		error: error
	    });
	}
    );
});

// apply the routes to our application
app.use('/', router);

app.listen(port_server, () => {
    console.log("Server listening on port http://localhost:" + port_server);
});
