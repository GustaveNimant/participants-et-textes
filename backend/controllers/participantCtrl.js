const participantModel = require('../models/participantModel');

exports.mainMenu = (req, res) => {
    res.render ('pages/index');
};

exports.createUser = (req, res, next) => {
    console.log('req.body', req.body);
    var nouveauParticipant = new participantModel(req.body);
    nouveauParticipant.save()
        .then(item => {
	    res.send('Le participant '+ req.body.pseudoParticipant + ' a été enregistré dans la base de données <br><a href="/">Retour a l\'accueil</a>');
        })
        .catch(err => {
	    res.status(400).send("Impossible d'enregistrer le participant ', req.body.pseudoParticipant,' dans la base de données");
        });
};

exports.getAUser = (req, res, next) => { 
    console.log('/Un-participant req.body est ', req.body);
    res.render ('pages/un-participant-post');
};
    
exports.getOneUser = (req, res, next) => {
    const pseudo = req.body.pseudoParticipant;
    console.log('getOneUser req.body est ', req.body);
    console.log('getOneUser Le pseudo est ', pseudo, '!');
    
    participantModel.findOne({
	pseudoParticipant: pseudo
    }).then(
	(a_user) => {
	    console.log('a_user is', a_user);
	    if (a_user) {
		res.render('pages/un-participant-get',
			   {
			       un_participant : a_user,
			       title_tag: "Un participant",
			       title_page: "Les coordonnées d'un participant"
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

exports.displayByIdUser = (req, res, next) => {
    const id = req.params.id;
    console.log('displayByIdUser req.params est ', req.params);
    console.log('displayByIdUser Le id est ', id, '!');
    
    participantModel.findOne({
	_id: id
    }).then(
	(a_user) => {
	    console.log('a_user is', a_user);
	    if (a_user) {
		res.render('pages/un-participant-get',
			   {
			       un_participant : a_user,
			       title_tag: "Un participant",
			       title_page: "Les coordonnées d'un participant"
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
			       title_tag: "Un participant",
			       title_page: "Les coordonnées d'un participant"
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
