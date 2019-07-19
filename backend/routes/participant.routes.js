const express = require('express');

// create an instance of the Router 
const router = express.Router();

const participantCtrl = require('../controllers/participantCtrl');

// route middleware that will happen on every request
router.use(function(req, res, next) {
    console.log('la méthode du middleware est ',req.method, 'son url est', req.url);
    next(); 
});

// apply routes to the Router instance.
router.get('/', participantCtrl.mainMenu);
router.get('/Les-participants', participantCtrl.getAllUser);
router.get('/Un-participant', participantCtrl.getAUser);
router.get('/participant-affichage-par-id/:id', participantCtrl.displayByIdUser);
router.get('/participant-affichage-par-pseudo', participantCtrl.displayByPseudoUser);
router.get('/participant-suppression-par-id/:id', participantCtrl.deleteByIdUser);
router.get('/participant-suppression-par-pseudo', participantCtrl.deleteByPseudoUser);
router.post('/Un-participant-post', participantCtrl.getOneUser);
router.post('/nouveau-participant', participantCtrl.createUser);

module.exports = router;
