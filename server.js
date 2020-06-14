'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

//Schemas
const user = require('./user-model');
const task = require('./task-model');
const categoryModel = require('./category-model');


//Inicializando o express
const app = express();
app.use('/static', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view-engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(cors());
//Estabelecendo parâmetros pra conectar
var porta = 8000;
var url = "mongodb+srv://genericUser:123456789abc@cluster0-eian9.gcp.mongodb.net/listadetarefas?retryWrites=true&w=majority"

//Conexão
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(client => {
    console.log('Conectado ao banco de dados')
}).catch((err) => {
    console.log('Erro ao conectar. Erro: ' + err)
})

app.listen(porta, () => {
    console.log('Em execução na porta: ' + porta)
})

//Login
var usuarioLogado = {};
var listaCategorias = {};
var listadetarefas = [];
app.post('/logar', (req, res) => {
    user.findOne(
        {
            $and: [
                { nomeUsuario: req.body.usuario },
                { senha: req.body.senha }]
        },
        (err, usuario) => {
            if (err) console.log(err);
            if (usuario == null) {
                res.render('index.ejs')
            }
            if (err) return console.log(err);
            usuarioLogado = usuario
            //Usuário salvo

            categoryModel.find({ nomeUsuario: usuarioLogado.nomeUsuario }, (err, categorias) => {
                if (err) console.log(err);
                listaCategorias = categorias;

                task.find({ nomeUsuario: usuarioLogado.nomeUsuario }, (err, tarefas) => {
                    if (err) console.log(err)
                    listadetarefas = tarefas;

                    res.render('task.ejs',
                        {
                            usuarioTopo: usuarioLogado,
                            listaCategorias: listaCategorias,
                            listadetarefas: listadetarefas
                        })
                })
            })
        })
})

//Logout
app.post('/deslogar', (req, res) => {
    if (usuarioLogado = true) {
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
        categoria: req.body.categoria,
        dataIni: new Date(),
        dataFim: new Date(req.body.dataConclusao),
        conclusao: 'Ativa'
    }

    task.collection.insertOne(tarefa, (err, result) => {
        if (err) console.log(err);
    })
    
    categoryModel.find({ nomeUsuario: usuarioLogado.nomeUsuario }, (err, categorias) => {
        if (err) console.log(err);
        listaCategorias = categorias;

        task.find({ nomeUsuario: usuarioLogado.nomeUsuario }, (err, tarefas) => {
            if (err) console.log(err)
            listadetarefas = tarefas;

            res.render('task.ejs',
                {
                    usuarioTopo: usuarioLogado,
                    listaCategorias: listaCategorias,
                    listadetarefas: listadetarefas
                })
        })
    })
})

//Nova categoria
app.post('/novaCategoria', (req, res) => {
    var categoria = {
        nomeUsuario: usuarioLogado.nomeUsuario,
        _categoria: req.body.novaCategoria
    }

    categoryModel.collection.insertOne(categoria, (err, result) => {
        if (err) console.log(err)
    })

    categoryModel.find({ nomeUsuario: usuarioLogado.nomeUsuario }, (err, categorias) => {
        if (err) console.log(err);
        listaCategorias = categorias;

        task.find({ nomeUsuario: usuarioLogado.nomeUsuario }, (err, tarefas) => {
            if (err) console.log(err)
            listadetarefas = tarefas;

            res.render('task.ejs',
                {
                    usuarioTopo: usuarioLogado,
                    listaCategorias: listaCategorias,
                    listadetarefas: listadetarefas
                })
        })
    })
})

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/carregarTarefas', (req, res) => {
    res.redirect('back')
})
