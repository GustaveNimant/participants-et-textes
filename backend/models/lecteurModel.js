const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const uniqueValidator = require('mongoose-unique-validator');
    
const userSchema = new Schema({
    email: { type: String},
    pseudo: { type: String},
    password: { type: String}
},{
    collection : 'lecteur_c'			    
});

//userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('userModel', userSchema);
