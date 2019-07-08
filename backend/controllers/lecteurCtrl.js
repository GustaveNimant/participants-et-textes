const lecteurModel = require('../models/lecteurModel');

exports.mainMenu = (req, res) => {
    res.render ('pages/index');
};

exports.createReader = (req, res, next) => {
    console.log('req.body', req.body);
    var nouveauLecteur = new lecteurModel(req.body);
    nouveauLecteur.save()
        .then(item => {
	    res.send('Le lecteur '+ req.body.pseudoLecteur + ' a été enregistré dans la base de données <br><a href="/">Retour a l\'accueil</a>');
        })
        .catch(err => {
	    res.status(400).send("Impossible d'enregistrer le lecteur '+ req.body.pseudoLecteur + ' dans la base de données");
        });
};

exports.getAReader = (req, res, next) => { 
    console.log('/Un-lecteur req.body est ', req.body);
    res.render ('pages/un-lecteur-post');
};
    
exports.getOneReader = (req, res, next) => {
    const pseudo = req.body.pseudoLecteur;
    console.log('getOneReader req.body est ', req.body);
    console.log('getOneReader Le pseudo est ', pseudo, '!');
    
    lecteurModel.findOne({
	pseudoLecteur: pseudo
    }).then(
	(a_reader) => {
	    console.log('1 a_reader is', a_reader);
	    if (a_reader) {
		res.render('pages/un-lecteur-get',
			   {
			       un_lecteur : a_reader,
			       title_tag: "Un lecteur",
			       title_page: "Les coordonnées d'un lecteur"
			   }
			  )
		// res.end ();
	    }
	    else {
		res.send('Le lecteur de pseudo '+ req.body.pseudoLecteur + ' n\'existe pas dans la base de données <br><br><a href="/">Retour a l\'accueil</a>');
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

exports.deleteByPseudoReader = (req, res, next) => {
    const pseudo = req.body.pseudoLecteur;
    console.log('deleteByPseudoReader req.body est ', req.body);
    console.log('deleteByPseudoReader Le pseudo est ', pseudo, '!');
    lecteurModel.deleteOne({
	pseudoLecteur: pseudo
    }).then(
	() => {
	    res.status(200).json({
		message: 'Le lecteur de pseudo ' + pseudo + ' a été supprimé'
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

exports.deleteByIdReader = (req, res, next) => {
    const id = req.body._id;
    console.log('deleteByIdReader req.body est ', req.body);
    console.log('deleteByIdReader Le id est ', id, '!');
    lecteurModel.deleteOne({
	_id: id
    }).then(
	() => {
	    res.status(200).json({
		message: 'Le lecteur de id ' + id + ' a été supprimé'
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

exports.getAllReader = (req, res, next) => {
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
