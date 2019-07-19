const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const uniqueValidator = require('mongoose-unique-validator');
    
const participantSchema = new Schema({
    emailParticipant: { type: String, required: true },
    pseudoParticipant: { type: String, required: true },
    passwordParticipant: { type: String, required: true }
},{
    collection : 'participant_c'			    
});

//participantSchema.plugin(uniqueValidator);

module.exports = mongoose.model('participantModel', participantSchema);
