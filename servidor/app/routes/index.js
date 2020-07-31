module.exports = function(application){
	application.get('/', function(req, res){

		//função do resonse que espera por parâmetro um json, com chaves pre definidas
		// se o cliente aceita text/html, o conteúdo pode ser o que está contido na chave html
		// se aceita o application.json, podemos retornar o conteudo do json
		res.format({
			html:function(){
				res.send('Bem vindo a sua app NodeJS!');
			},
			json:function(){
				var retorno ={
					body:'Bem vindo a sua app NodeJS!'
				}
				res.json(retorno);
			}
		});
		
	});

	application.post('/', function(req, res){
		var dados = req.body;
		res.send(dados);


	});
}