const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Schemas
const user = require('./user-model');
const task = require('./task-model');
const categoryModel = require('./category-model');


//Inicializando o express
const app = express();
app.use('/static', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}))
app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

//Estabelecendo parâmetros pra conectar
var porta = 8000;
var url = "mongodb+srv://genericUser:123456789abc@cluster0-eian9.gcp.mongodb.net/listadetarefas?retryWrites=true&w=majority"

//Conexão
var db = mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}).then(client => {
    console.log('Conectado ao banco de dados')
}).catch((err) => {
    console.log('Erro ao conectar. Erro: ' + err)
})

app.listen(porta, () => 
{
    console.log('Em execução na porta: '+ porta)
})

//Login
var usuarioLogado;
app.post('/logar', (req, res) => {
    var query = user.findOne({$and:[ {nomeUsuario: req.body.usuario}, {senha: req.body.senha} ] }, (err, usuario) =>{
        if (err) console.log(err);
        if (usuario != null){
            query.exec((err, usuario) => {
                if(err) return console.log(err);
                usuarioLogado = usuario
                res.render('task.ejs', {usuarioTopo: usuarioLogado.nome + " " + usuarioLogado.sobrenome + " - "+ usuarioLogado.nomeUsuario})
            })
        } else {
            res.render('index.ejs')
        }
    })
})

//Logout
app.post('/deslogar',(req,res)=>{
    if (usuarioLogado = true){
        usuario = null,
        res.render('index.ejs')
    }
})

//Nova tarefa
app.post('/novaTarefa', (req, res) => {
    var tarefa = {
        nomeUsuario: usuarioLogado.nomeUsuario,
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        dataIni: new Date(),
        dataFim: new Date(req.body.dataFim),
        conclusao: 'Ativa'
    }

    task.collection.insertOne(tarefa, (err, result) => {
        if (err) console.log(err);
    })

    res.render('task.ejs', {usuarioTopo: usuarioLogado.nome + " " + usuarioLogado.sobrenome + " - "+ usuarioLogado.nomeUsuario})
})

//Nova categoria
app.post('/novaCategoria', (req, res) =>{
        var categoria = {
        nomeUsuario: usuarioLogado.nomeUsuario,
        _categoria: req.body.novaCategoria
    }

    categoryModel.collection.insertOne(categoria, (err, result) => {
        if (err) console.log(err)
    })
})

app.get('/', (req, res) => {
    res.render('index.ejs')
})

module.exports.usuarioLogado = usuarioLogado;