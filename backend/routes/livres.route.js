const express = require('express');
const livresRoutes = express.Router();

let livreModel = require('../models/livreModel');

let getAllBooks = (req, res, next) => {
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
