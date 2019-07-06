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

const lecteurRoutes = require('./backend/routes/lecteur.routes')
const router = require('./backend/routes/lecteur.routes')
// route middleware that will happen on every request
router.use(function(req, res, next) {
    console.log('la méthode du middleware est ',req.method, 'son url est', req.url);
    next(); 
});

// apply the routes to our application
app.use('/', router);

app.listen(port_server, () => {
    console.log("Server listening on port http://localhost:" + port_server);
});
