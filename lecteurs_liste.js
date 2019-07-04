const express = require("express");
const app = express();

app.set ('view engine', 'ejs');

const router = express.Router();

const db_config = require('./backend/models/db_config');
const port_server = db_config.SERVER_PORT;

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const DB_URI = mongoose.connect(db_config.DB_URI, { useNewUrlParser: true })
    .then(
	() => {console.log('Database is connected to Uri', DB_URI)}
    )
    .catch ((error) => {
	console.log('Can not connect to the database');
	console.error(error);
    });

/* Acceuil */
app.use('/', router);

router.get ('/', (req, res) => {
    res.render ('pages/index');
});

/* Les lecteurs */
const readersRoute = require('./backend/routes/lecteurs.route')

router.get("/Les-lecteurs", readersRoute);

app.listen(port_server, () => {
    console.log("Server listening on port http://localhost:" + port_server);
});
