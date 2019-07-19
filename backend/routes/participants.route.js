const express = require('express');
const participantsRoutes = express.Router();

let participantModel = require('../models/participantModel');

let usersRoute = (req, res, next) => {
    participantModel.find()
	.then (
	    (participant_liste) => {
		res.render('pages/les-participants',
			   {
			       participants : participant_liste,
			       title_tag: "Les participants",
			       title_page: "La liste des participants"
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

module.exports = usersRoute;
