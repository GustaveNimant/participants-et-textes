const participantModel = require('../models/participantModel');

exports.mainMenu = (req, res) => {
    res.render ('pages/index');
};

exports.createUser = (req, res, next) => {
    console.log('Entrée dans createUser avec req.body', req.body);
    
    var nouveauParticipant = new participantModel(req.body);
    console.log('Dans createUser nouveauParticipant est', nouveauParticipant);
    nouveauParticipant.save()
        .then(item => {
	    res.send('Le participant de pseudo '+ req.body.pseudoParticipant + ' et d\'email ' + req.body.emailParticipant + ' a été enregistré dans la base de données <br><a href="/">Retour a l\'accueil</a>');
        })
        .catch(err => {
	    res.status(400).send("Impossible d'enregistrer le participant ', req.body.pseudoParticipant,' dans la base de données");
        });
};

exports.getAUser = (req, res, next) => { 
    console.log('Dans getAUser req.body est ', req.body);
    res.render ('pages/un-participant-post');
};
    
exports.getOneUser = (req, res, next) => {
    const pseudo = req.body.pseudoParticipant;
    console.log('Dans getOneUser req.body est ', req.body);
    console.log('Dans getOneUser Le pseudo est ', pseudo, '!');
    
    participantModel.findOne({
	pseudoParticipant: pseudo
    }).then(
	(a_user) => {
	    console.log('a_user is', a_user);
	    if (a_user) {
		res.render('pages/un-participant-get',
			   {
			       un_participant : a_user,
			       pseudo_tag: "Un participant",
			       pseudo_page: "Les coordonnées d'un participant"
			   }
			  )
		// res.end ();
	    }
	    else {
		res.send('Le participant de pseudo '+ pseudo + ' n\'existe pas dans la base de données <br><br><a href="/">Retour a l\'accueil</a>');
	    }
	}
    ).catch(
	(error) => {
	    res.status(404).json({
		error: error
	    });
	}
    );
};

exports.displayByIdUser = (req, res, next) => {
    const id = req.params.id;
    console.log('Dans displayByIdUser req.params est ', req.params);
    console.log('Dans displayByIdUser Le id est ', id, '!');
    
    participantModel.findOne({
	_id: id
    }).then(
	(a_user) => {
	    console.log('Dans displayByIdUser a_user is', a_user);
	    if (a_user) {
		res.render('pages/un-participant-get',
			   {
			       un_participant : a_user,
			       pseudo_tag: "Un participant",
			       pseudo_page: "Les coordonnées d'un participant"
			   }
			  )
		// res.end ();
	    }
	    else {
		res.send('Le participant de pseudo '+ req.body.pseudoParticipant + ' n\'existe pas dans la base de données <br><br><a href="/">Retour a l\'accueil</a>');
	    }
	}
    ).catch(
	(error) => {
	    res.status(404).json({
		error: error
	    });
	}
    );
};

exports.displayByPseudoUser = (req, res, next) => {
    const pseudo = req.body.pseudoParticipant;
    console.log('displayByPseudoUser req.body est ', req.body);
    console.log('displayByPseudoUser Le pseudo est ', pseudo, '!');
    
    participantModel.findOne({
	pseudoParticipant: pseudo
    }).then(
	(a_user) => {
	    console.log('a_user is', a_user);
	    if (a_user) {
		res.render('pages/un-participant-get',
			   {
			       un_participant : a_user,
			       pseudo_tag: "Un participant",
			       pseudo_page: "Les coordonnées d'un participant"
			   }
			  )
		// res.end ();
	    }
	    else {
		res.send('Le participant de pseudo '+ req.body.pseudoParticipant + ' n\'existe pas dans la base de données <br><br><a href="/">Retour a l\'accueil</a>');
	    }
	}
    ).catch(
	(error) => {
	    res.status(404).json({
		error: error
	    });
	}
    );
};

exports.deleteByPseudoUser = (req, res, next) => {
    const pseudo = req.body.pseudoParticipant;
    console.log('deleteByPseudoUser req.body est ', req.body);
    console.log('deleteByPseudoUser Le pseudo est ', pseudo, '!');

    participantModel.deleteOne({
	pseudoParticipant: pseudo
    }).then(
	() => {
	    res.status(200).json({
		message: 'Le participant de pseudo ' + pseudo + ' a été supprimé'
	    });
	}
    ).catch(
	(error) => {
		res.status(400).json({
		    error: error
		});
	}
    );
};

exports.deleteByIdUser = (req, res, next) => {
    const id = req.params.id;
    console.log('deleteByIdUser req.params est ', req.params);
    console.log('deleteByIdUser Le id est ', id, '!');
    participantModel.deleteOne({
	_id: id
    }).then(
	() => {
	    res.send('Le participant d\'id '+ id + ' a été supprimé de la base de données <br><a href="/">Retour a l\'accueil</a>');
	}
    ).catch(
	(error) => {
	    res.status(400).json({
		error: error
	    });
	});
};

exports.getAllUser = (req, res, next) => {
    participantModel.find()
	.then (
	    (participant_liste) => {
		res.render('pages/les-participants',
			   {
			       participants : participant_liste,
			       pseudo_tag: "Les participants",
			       pseudo_page: "La liste des participants"
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
