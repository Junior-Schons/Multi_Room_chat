//import do modulo do framework express
const express = require('express');

//import do modulo consign
const consign  = require('consign');

//import do modulo body-parser
const bodyParser = require('body-parser');

// Importe o módulo express-validator
const { body, validationResult } = require('express-validator');

//iniciando o objeto do express
const app = express();

//setar as variaveis do express
app.set('view engine', 'ejs');
app.set('views', './app/views');

//configuração do midleware express.static
app.use(express.static('./app/public'));

//configuração do midleware body-parser
app.use(bodyParser.urlencoded({extended: true}));

//configuração do midleware express-validator
app.use(body())

//efetua o autoload das rotas, dos models e dos controllers para o objeto app
consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(app)

//exportando o objeto app
module.exports = app;