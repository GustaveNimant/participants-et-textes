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
    lecteurModel.findOne({
	_id:req.params.id
    }).then (
	(lecteur) => {
	    res.render('pages/un-lecteur',
		       {
			   lecteur : lecteur,
			   title_tag: "Un lecteur",
			   title_page: "Coordonnées d'un lecteur"
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
