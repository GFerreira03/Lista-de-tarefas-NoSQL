const mongoose = require('mongoose');

const tarefasSchema = new mongoose.Schema({
    nomeUsuario: String,
    titulo: String,
    descricao: String,
    dataIni: Date,
    dataFim: Date,
    conclusao: {type: String, enum: ['Ativa', 'Concluida', 'Atrasada']} 
})

module.exports = mongoose.model('tarefas', tarefasSchema);