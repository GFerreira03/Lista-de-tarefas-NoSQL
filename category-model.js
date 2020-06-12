const mongoose = require('mongoose')

const categoriasSchema = new mongoose.Schema({
    nomeUsuario: String,
    _categoria: String
})

module.exports = mongoose.model('categorias', categoriasSchema)