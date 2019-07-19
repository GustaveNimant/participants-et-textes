const express = require('express');

// create an instance of the Router 
const router = express.Router();

const texteCtrl = require('../controllers/texteCtrl');

// route middleware that will happen on every request
router.use(function(req, res, next) {
    console.log('la méthode du middleware est ',req.method, 'son url est', req.url);
    next(); 
});

// apply routes to the Router instance.
router.get ('/', texteCtrl.mainMenu);
router.get('/Les-textes', texteCtrl.getAllText);
router.get('/Un-texte', texteCtrl.getAText);
router.get('/texte-affichage-par-id/:id', texteCtrl.displayByIdText);
router.get('/texte-affichage-par-title', texteCtrl.displayByTitleText);
router.get('/texte-suppression-par-id/:id', texteCtrl.deleteByIdText);
router.get('/texte-suppression-par-title', texteCtrl.deleteByTitleText);
router.post('/Un-texte-post', texteCtrl.getOneText);
router.post('/nouveau-texte', texteCtrl.createText);

module.exports = router;
