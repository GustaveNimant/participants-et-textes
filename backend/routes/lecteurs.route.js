const express = require('express');
const lecteursRoutes = express.Router();

let lecteurModel = require('../models/lecteurModel');

let getAllReaders = (req, res, next) => {
    const title_tag = "Les lecteurs";
    const title_page = "La liste des lecteurs";
    lecteurModel.find()
	.then (
	    (lecteur_list) => {
		res.render('pages/les-lecteurs',
			   {
			       lecteurs : lecteur_list,
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

module.exports = getAllReaders;
