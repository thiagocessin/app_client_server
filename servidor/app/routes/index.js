module.exports = function(application){
	application.get('/', function(req, res){

		console.log('GET - dados');

		var connection = application.config.dbConnection;
		console.log('Connection',connection);
		var UsuariosDAO = new application.app.models.UsuariosDAO(connection);


		//função do resonse que espera por parâmetro um json, com chaves pre definidas
		// se o cliente aceita text/html, o conteúdo pode ser o que está contido na chave html
		// se aceita o application.json, podemos retornar o conteudo do json
		res.format({
			html:function(){
				res.send('Bem vindo a sua app NodeJS 2!');
			},
			json:function(){
				var retorno ={
					body:'Bem vindo a sua app NodeJS 3!'
				}
				res.json(retorno);
			}
		});
		
	});

	application.post('/teste', function(req, res){
		var dados = req.param;
		console.log('POST - dados', dados.param);
		res.send(dados);

	});
}