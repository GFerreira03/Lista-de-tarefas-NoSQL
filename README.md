## Lista de tarefas NoSQL

[Link](https://lista-de-tarefas-nosql.herokuapp.com/) para aplicação no Heroku
Usuario: teste
Senha: nosql

### Escolha de banco de dados

Utilizamos o banco de dados orientado a documentos MongoDB por ser um banco de dados que já vinhamos estudando, portanto
facilitaria a implementação.

## Implementação

Optamos por utilizar o *Mongoose* e *Body-parser* para a comunicação e tratamento dos dados recebidos do banco de dados (Como criação de *schemas* e *queries* no mongoose, por exemplo) por serem ferramentas mais simples e por encontrar maior conteúdo online. Ademais, utilizamos NodeJs para a entrada e saída de dados e o EJS para a renderização e execução de JavaScript dentro dos documentos HTML.