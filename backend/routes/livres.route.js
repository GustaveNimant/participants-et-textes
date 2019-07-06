const express = require('express');
const livresRoutes = express.Router();

let livreModel = require('../models/livreModel');

let getAllBooks = (req, res, next) => {
    livreModel.find()
	.then (
	    (livre_liste) => {
		res.render('pages/les-livres',
			   {
			       livres : livre_liste,
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
};

module.exports = getAllBooks;
