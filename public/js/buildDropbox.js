const categoryModel = require('./category-model');
const usuarioLogado = require('server.js')

    var slct = document.getElementById("categorySelector")
    var optn = document.createElement("option")

    console.log('Davai')
    var query = categoryModel.find({nomeUsuario: usuarioLogado.nomeUsuario}, {_id: 0, nomeUsuario: 0}, (err, tarefas) => {

        if (err) console.log(err)
        if (tarefas != null){
            query.exec((err, tarefas) => {
                if(err) console.log(err)
                for(var i = 0; i < tarefas.length(); i++){
                    optn.text = tarefas[0]
                    optn.value = tarefas[0]
                    slct.appendChild(optn)
                }
            })
        }
    })
