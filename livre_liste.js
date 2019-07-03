const express = require("express");
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set ('view engine', 'ejs');
const router = express.Router();

const db_config = require('./backend/models/db_config');
const port_server = db_config.SERVER_PORT;

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect(db_config.DB_URI, { useNewUrlParser: true })
    .then( /* Promise */
	() => {console.log('Database is connected to Uri', db_config.DB_URI)}
    )
    .catch ((error) => {
	console.log('Can not connect to the database');
	console.error(error);
    });

router.get ('/', (req, res) => {
    res.render ('pages/index');
});

app.use('/', router);

const livreModel = require('./backend/models/livreModel');

const livres_query = livreModel.find();

var livre_list = new Array ();
     
livres_query.exec(function (err, les_livres) {
    if (err) { throw err; }
    var un_livre;
    console.log('length', les_livres.length);

    livre_list = les_livres; 
 });

var getAllBooks = (req, res, next) => {
    const title_tag = "Les livres";
    const title_page = "La liste des livres";
    
    livreModel.find()
	.then (
	    (livre_list) => {
		res.render('pages/les-livres',
			   {
			       livres : livre_list,
			       title_tag: title_tag,
			       title_page: title_page
			   }
			  )
	    }
	).catch(
	    (error) => {
		res.status(400).json({
		    error: error
		});
	    }
	);
}

router.get("/Les-livres", getAllBooks);

app.use("/Les_Livres", router);

app.listen(port_server, () => {
    console.log("Server listening on port http://localhost:" + port_server);
});
