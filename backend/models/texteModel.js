const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const texteSchema = new Schema({
    titreTexte: { type: String, required: true },
    auteurTexte: { type: String, required: true }
},{
    collection : 'texte_c'
});

module.exports = mongoose.model('texteModel', texteSchema);
