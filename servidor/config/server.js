/* importar o módulo do framework express */
var express = require('express');

/* importar o módulo do consign */
var consign = require('consign');

/* importar o módulo do body-parser */
var bodyParser = require('body-parser');

/* importar o módulo do express-validator */
var expressValidator = require('express-validator');

/* iniciar o objeto do express */
var app = express();

/* setar as variáveis 'view engine' e 'views' do express */
app.set('view engine', 'ejs');
app.set('views', './app/views');

/* configurar o middleware express.static */
app.use(express.static('./app/public'));

/* configurar o middleware body-parser */
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/* configurar o middleware express-validator */
app.use(expressValidator());

/* efetua o autoload das rotas, dos models e dos controllers para o objeto app */
consign()
	.include('app/routes')
	.then('app/models')
	.then('app/controllers')
	.then('config/dbConnection.js')
	.into(app);

//middleware que configura as paginas de status que representam erros
app.use(function(req,res,next){
	res.status(404).render('erros/404');
	next();
});
//middleware que configura msg derrro interno do servidor
//(erro gerado pelo express)
app.use(function(erro,req,res,next){
	res.status(404).render('erros/500');
	next();
});

/* exportar o objeto app */
module.exports = app;