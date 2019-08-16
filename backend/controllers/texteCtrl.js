const texteModel = require('../models/texteModel');

exports.mainMenu = (req, res) => {
    res.render ('pages/index');
};

exports.createText = (req, res, next) => {
    console.log('Entrée dans createText avec req.body', req.body);

    var nouveauTexte = new texteModel(req.body);
    console.log('Dans createText nouveauTexte est', nouveauTexte);
    nouveauTexte.save()
        .then(item => {
	    res.send('Le texte de titre '+ req.body.titreTexte + ' et d\'auteur ' + req.body.auteurTexte + ' a été enregistré dans la base de données <br><a href="/">Retour a l\'accueil</a>');
        })
        .catch(err => {
	    res.status(400).send("Impossible d'enregistrer le texte ', req.body.titleTexte,' dans la base de données");
        });
};

exports.getAText = (req, res, next) => { 
    console.log('Dans getAText req.body est ', req.body);
    res.render ('pages/un-texte-post');
};
    
exports.getOneText = (req, res, next) => {
    const title = req.body.titleTexte;
    const author = req.body.auteurTexte;

    console.log('Dans getOneText req.body est ', req.body);
    console.log('Dans getOneText Le title est ', title);
    console.log('Dans getOneText Le author est ', author);
    
    texteModel.findOne({ /* A CORRIGER */
	titleTexte: title,
	auteurTexte: author
    }).then(
	(a_text) => {
	    console.log('a_text is', a_text);
	    if (a_text) {
		res.render('pages/un-texte-get',
			   {
			       un_texte : a_text,
			       title_tag: "Un texte",
			       title_page: "Les coordonnées d'un texte"
			   }
			  )
		// res.end ();
	    }
	    else {
		res.send('Le texte de title '+ title + ' et d\'author ' + author + ' n\'existe pas dans la base de données <br><br><a href="/">Retour a l\'accueil</a>');
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

exports.displayByIdText = (req, res, next) => {
    const id = req.params.id;
    console.log('Dans displayByIdText req.params est ', req.params);
    console.log('Dans displayByIdText Le id est ', id, '!');
    
    texteModel.findOne({
	_id: id
    }).then(
	(a_text) => {
	    console.log('Dans displayByIdText a_text is', a_text);
	    if (a_text) {
		res.render('pages/un-texte-get',
			   {
			       un_texte : a_text,
			       title_tag: "Un texte",
			       title_page: "Les coordonnées d'un texte"
			   }
			  )
		// res.end ();
	    }
	    else {
		res.send('Le texte de title '+ req.body.titleTexte + ' n\'existe pas dans la base de données <br><br><a href="/">Retour a l\'accueil</a>');
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

exports.displayByTitleText = (req, res, next) => {
    const title = req.body.titleTexte;
    console.log('displayByTitleText req.body est ', req.body);
    console.log('displayByTitleText Le title est ', title, '!');
    
    texteModel.findOne({
	titleTexte: title
    }).then(
	(a_text) => {
	    console.log('a_text is', a_text);
	    if (a_text) {
		res.render('pages/un-texte-get',
			   {
			       un_texte : a_text,
			       title_tag: "Un texte",
			       title_page: "Les coordonnées d'un texte"
			   }
			  )
		// res.end ();
	    }
	    else {
		res.send('Le texte de title '+ req.body.titleTexte + ' n\'existe pas dans la base de données <br><br><a href="/">Retour a l\'accueil</a>');
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

exports.deleteByTitleText = (req, res, next) => {
    const title = req.body.titleTexte;
    console.log('deleteByTitleText req.body est ', req.body);
    console.log('deleteByTitleText Le title est ', title, '!');

    texteModel.deleteOne({
	titleTexte: title
    }).then(
	() => {
	    res.status(200).json({
		message: 'Le texte de title ' + title + ' a été supprimé'
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

exports.deleteByIdText = (req, res, next) => {
    const id = req.params.id;
    console.log('deleteByIdText req.params est ', req.params);
    console.log('deleteByIdText Le id est ', id, '!');
    texteModel.deleteOne({
	_id: id
    }).then(
	() => {
	    res.send('Le texte d\'id '+ id + ' a été supprimé de la base de données <br><a href="/">Retour a l\'accueil</a>');
	}
    ).catch(
	(error) => {
	    res.status(400).json({
		error: error
	    });
	});
};

exports.getAllText = (req, res, next) => {
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
