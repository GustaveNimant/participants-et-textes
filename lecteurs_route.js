const express = require("express");
const app = express();

const port_server = 3000;
app.set ('view engine', 'ejs');

const router = express.Router();

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const DB_URI = mongoose.connect('mongodb://localhost:27017/lecteurs-et-livres-db', { useNewUrlParser: true })
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

const lecteurSchema = new Schema({
    email: { type: String },
    pseudo: { type: String },
    password: { type: String }
});

const readersRoute = require('./backend/routes/lecteurs.route')

router.get("/Les-lecteurs", readersRoute);

app.listen(port_server, () => {
    console.log("Server listening on port http://localhost:" + port_server);
});
