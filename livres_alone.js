const express = require("express");
const app = express();

app.set ('view engine', 'ejs');

const router = express.Router();
const port_server = 3000;

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const DB_URI = mongoose.connect('mongodb://localhost:27017/livres-db', { useNewUrlParser: true })
    .then(
	() => {console.log('Database is connected to Uri', DB_URI)}
    )
    .catch ((error) => {
	console.log('Can not connect to the database');
	console.error(error);
    });

router.get ('/', (req, res) => {
    res.render ('pages/index');
});

app.use('/', router);

const Schema = mongoose.Schema;

const livreSchema = new Schema({
    titreLivre: { type: String, required: true },
    auteurLivre: { type: String, required: true }
});
const livreModel = mongoose.model('livreModel', livreSchema);

var getAllBooks = (req, res, next) => {
    livreModel.find()
	.then (
	    (livre_list) => {
		res.render('pages/les-livres',
			   {
			       livres : livre_list,
			       title_tag: "Les livres",
			       title_page: "La liste des livres"
			   }
			  );
		next();
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

app.listen(port_server, () => {
    console.log("Server listening on port http://localhost:" + port_server);
});
