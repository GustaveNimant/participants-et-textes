const express = require('express');

// create an instance of the Router 
const router = express.Router();

const livreCtrl = require('../controllers/livreCtrl');

// route middleware that will happen on every request
router.use(function(req, res, next) {
    console.log('la méthode du middleware est ',req.method, 'son url est', req.url);
    next(); 
});

// apply routes to the Router instance.
router.get ('/', livreCtrl.mainMenu);
router.get('/Les-livres', livreCtrl.getAllBook);
router.get('/Un-livre', livreCtrl.getABook);
router.get('/livre-affichage-par-id/:id', livreCtrl.displayByIdBook);
router.get('/livre-affichage-par-title', livreCtrl.displayByTitleBook);
router.get('/livre-suppression-par-id/:id', livreCtrl.deleteByIdBook);
router.get('/livre-suppression-par-title', livreCtrl.deleteByTitleBook);
router.post('/Un-livre-post', livreCtrl.getOneBook);
router.post('/nouveau-livre', livreCtrl.createBook);

module.exports = router;
