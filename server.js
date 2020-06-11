const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Schemas
const user = require('./user-model');
const task = require('./task-model');

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
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}).then(client => {
    console.log('Conectado ao banco de dados')
}).catch((err) => {
    console.log('Erro ao conectar. Erro: ' + err)
})

app.listen(porta, () => 
{
    console.log('Em execução na porta: '+ porta)
})

//Login
app.post('/logar', (req, res) => {
    var query = user.findOne({$and:[ {nomeUsuario: req.body.usuario}, {senha: req.body.senha} ] }, (err, usuario) =>{
        if (err) console.log(err);
        if (usuario != null){
            query.exec((err, usuario) => {
                if(err) return console.log(err);
                res.render('task.ejs')
            })
        } else {
            res.render('index.ejs')
        }
    })
})

app.get('/', (req, res) => {
    res.render('index.ejs')
})

