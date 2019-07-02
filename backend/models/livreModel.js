const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const livreSchema = new Schema({
    titreLivre: { type: String, required: true },
    auteurLivre: { type: String, required: true }
},{
    collection : 'livre_c'
});

module.exports = mongoose.model('livreModel', livreSchema);
