const express = require('express');
const lecteursRoutes = express.Router();

let lecteurModel = require('../models/lecteurModel');

let readersRoute = (req, res, next) => {
    lecteurModel.find()
	.then (
	    (lecteur_liste) => {
		res.render('pages/les-lecteurs',
			   {
			       lecteurs : lecteur_liste,
			       title_tag: "Les lecteurs",
			       title_page: "La liste des lecteurs"
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
};

module.exports = readersRoute;
