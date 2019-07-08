const db_config = require('./models/db_config');

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

exports.Db_Promise;
