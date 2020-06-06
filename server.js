const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Inicializando o express
const app = express();

var porta = 8000;
var url = "mongodb+srv://genericUser:123456789abc@cluster0-eian9.gcp.mongodb.net/listadetarefas?retryWrites=true&w=majority"
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log('Conectado ao banco de dados')
}).catch((err) => {
    console.log('Erro ao conectar. Erro: ' + err)
})
app.listen(porta, () => 
{
    console.log('Em execução na porta: '+ porta)
})

