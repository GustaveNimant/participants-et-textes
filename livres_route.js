const express = require("express");
const app = express();

app.set ('view engine', 'ejs');

const router = express.Router();
const port_server = 3000;

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const DB_URI = 'mongodb://localhost:27017/livres-db';

const Db_Promise = mongoose.connect(DB_URI, { useNewUrlParser: true })
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

const getAllBooks = require('./backend/routes/livres.route')

router.get("/Les-livres", getAllBooks);

app.listen(port_server, () => {
    console.log("Server listening on port http://localhost:" + port_server);
});
