const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

const usuariosSchema = new mongoose.Schema({
    nomeUsuario: { type: String, unique: true},
    senha: String,
    nome: String,
    sobrenome: String,
    idade: Number 
})

usuariosSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Usuario', usuariosSchema);