const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const uniqueValidator = require('mongoose-unique-validator');
    
const lecteurSchema = new Schema({
    email: { type: String, required: true },
    pseudo: { type: String, required: true },
    password: { type: String, required: true }
},{
    collection : 'lecteur_c'			    
});

//lecteurSchema.plugin(uniqueValidator);

module.exports = mongoose.model('lecteurModel', lecteurSchema);
