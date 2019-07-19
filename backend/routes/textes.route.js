const express = require('express');
const textesRoutes = express.Router();

let texteModel = require('../models/texteModel');

let getAllTexts = (req, res, next) => {
    texteModel.find()
	.then (
	    (texte_liste) => {
		res.render('pages/les-textes',
			   {
			       textes : texte_liste,
			       title_tag: "Les textes",
			       title_page: "La liste des textes"
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

module.exports = getAllTexts;
