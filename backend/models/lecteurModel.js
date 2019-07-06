const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const uniqueValidator = require('mongoose-unique-validator');
    
const lecteurSchema = new Schema({
    emailLecteur: { type: String, required: true },
    pseudoLecteur: { type: String, required: true },
    passwordLecteur: { type: String, required: true }
},{
    collection : 'lecteur_c'			    
});

//lecteurSchema.plugin(uniqueValidator);

module.exports = mongoose.model('lecteurModel', lecteurSchema);
