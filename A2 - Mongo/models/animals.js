let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var animalSchema = new Schema({
    // id: {type: mongoose.Types.ObjectId},
    usuario:{type: String, required: true},
    nome: {type: String, required: true},
    especie: {type: String, required: true},
});

module.exports = mongoose.model('Animal', animalSchema);