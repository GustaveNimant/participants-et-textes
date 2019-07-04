const express = require('express');
const lecteursRoutes = express.Router();

let lecteurModel = require('../models/lecteurModel');

let getOneReader = (req, res, next) => {
    lecteurModel.findOne({
	_id:req.params.id
    }).then (
	(lecteur) => {
	    res.render('pages/un-lecteur',
		       {
			   lecteur : lecteur,
			   title_tag: "Un lecteur" ,
			   title_page: "Un lecteur"
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

module.exports = getOneReader;
