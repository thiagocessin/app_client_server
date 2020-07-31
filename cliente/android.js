//aplicação android que fará requests ao servidor
var http = require('http');

var opcoes = {
	hostname:'localhost',
	port:80,
	path:'/',
	method:'post',
	headers:{
		'Accept':'application/json',//muito comum em aplicações android ou angular
		'Content-type':'application/json'
	}
};

//Content-type

var html='nome=José';//x-www-form-urlencoded
var json = {nome:'José'};
var string_json = JSON.stringify(json);

var buffer_corpo_response = [];
//funcao http.get nativa do modulo do node
//permite a realizaçao de uma requisição via get
//parametros(string ou json, callback(objeto retornado da requisição que foi feita via get))
//http.get(opcoes,function(res){//requisicao via get para recuperar informação do server
var req = http.request(opcoes,function(res){//retorna uma instancia da classe ClientRequest, envia informações ao server
	//http.request permite que escreva dados na requisição para serem enviados
	//a partir da função on é possivel identificar alguns estados da requisição
	//data - existe quando a requisição está em curso, ela vai recebendo pedaços de informação do servidor web
	//o servidor vai enviando aos poucos a informaçao e aos poucos ela vai sendo renderizada no navegador
	res.on('data',function(pedaco){
		buffer_corpo_response.push(pedaco);//pedaço esta em formato de buffer
	});

	//quando finalizou o carregamento da página
	res.on('end',function(){
		var corpo_response = Buffer.concat(buffer_corpo_response).toString();
		console.log(corpo_response);
		console.log(res.statusCode);
	});

	res.on('error',function(){

	});

});

req.write(string_json);//enviando dados ao servidor,via post
//disparamos a requisição no final
req.end();