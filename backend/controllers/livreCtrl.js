const livreModel = require('../models/livreModel');

exports.mainMenu = (req, res) => {
    res.render ('pages/index');
};

exports.createBook = (req, res, next) => {
    console.log('req.body', req.body);
    var nouveauLivre = new livreModel(req.body);
    nouveauLivre.save()
        .then(item => {
	    res.send('Le livre '+ req.body.pseudoLivre + ' a été enregistré dans la base de données <br><a href="/">Retour a l\'accueil</a>');
        })
        .catch(err => {
	    res.status(400).send("Impossible d'enregistrer le livre '+ req.body.pseudoLivre + ' dans la base de données");
        });
};

exports.getABook = (req, res, next) => { 
    console.log('/Un-livre req.body est ', req.body);
    res.render ('pages/un-livre-post');
};
    
exports.getOneBook = (req, res, next) => {
    const title = req.body.titleLivre;
    console.log('getOneBook req.body est ', req.body);
    console.log('getOneBook Le title est ', title, '!');
    
    livreModel.findOne({
	titleLivre: title
    }).then(
	(a_reader) => {
	    console.log('a_reader is', a_reader);
	    if (a_reader) {
		res.render('pages/un-livre-get',
			   {
			       un_livre : a_reader,
			       title_tag: "Un livre",
			       title_page: "Les coordonnées d'un livre"
			   }
			  )
		// res.end ();
	    }
	    else {
		res.send('Le livre de title '+ req.body.titleLivre + ' n\'existe pas dans la base de données <br><br><a href="/">Retour a l\'accueil</a>');
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

exports.displayByIdBook = (req, res, next) => {
    const id = req.params.id;
    console.log('displayByIdBook req.params est ', req.params);
    console.log('displayByIdBook Le id est ', id, '!');
    
    livreModel.findOne({
	_id: id
    }).then(
	(a_reader) => {
	    console.log('a_reader is', a_reader);
	    if (a_reader) {
		res.render('pages/un-livre-get',
			   {
			       un_livre : a_reader,
			       title_tag: "Un livre",
			       title_page: "Les coordonnées d'un livre"
			   }
			  )
		// res.end ();
	    }
	    else {
		res.send('Le livre de title '+ req.body.titleLivre + ' n\'existe pas dans la base de données <br><br><a href="/">Retour a l\'accueil</a>');
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

exports.displayByTitleBook = (req, res, next) => {
    const title = req.body.titleLivre;
    console.log('displayByTitleBook req.body est ', req.body);
    console.log('displayByTitleBook Le title est ', title, '!');
    
    livreModel.findOne({
	titleLivre: title
    }).then(
	(a_reader) => {
	    console.log('a_reader is', a_reader);
	    if (a_reader) {
		res.render('pages/un-livre-get',
			   {
			       un_livre : a_reader,
			       title_tag: "Un livre",
			       title_page: "Les coordonnées d'un livre"
			   }
			  )
		// res.end ();
	    }
	    else {
		res.send('Le livre de title '+ req.body.titleLivre + ' n\'existe pas dans la base de données <br><br><a href="/">Retour a l\'accueil</a>');
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

exports.deleteByTitleBook = (req, res, next) => {
    const title = req.body.titleLivre;
    console.log('deleteByTitleBook req.body est ', req.body);
    console.log('deleteByTitleBook Le title est ', title, '!');

    livreModel.deleteOne({
	titleLivre: title
    }).then(
	() => {
	    res.status(200).json({
		message: 'Le livre de title ' + title + ' a été supprimé'
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

exports.deleteByIdBook = (req, res, next) => {
    const id = req.params.id;
    console.log('deleteByIdBook req.params est ', req.params);
    console.log('deleteByIdBook Le id est ', id, '!');
    livreModel.deleteOne({
	_id: id
    }).then(
	() => {
	    res.send('Le livre d\'id '+ id + ' a été supprimé de la base de données <br><a href="/">Retour a l\'accueil</a>');
	}
    ).catch(
	(error) => {
	    res.status(400).json({
		error: error
	    });
	});
};

exports.getAllBook = (req, res, next) => {
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
