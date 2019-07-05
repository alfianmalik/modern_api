const hapi = require('hapi');
const Joi = require('joi');
const mongoose = require('mongoose');
const s3 = require('hapi-s3');
const slug = require('slugify');
const Travel = require('./models/Travel');
const Opentrip = require('./models/Opentrip');

/* swagger section */
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');

const port = process.env.PORT || 4000;
require('dotenv').config();

// mongoose.connect('mongodb://localhost:27017/pathravel', function(err) {
// 			if (err) {
//                 console.log('MongoDB connection error');
//                 process.exit(1);
//             }
// 		});
// mongoose.connect(`mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@ds141320.mlab.com:41320/pathravel`);

// mongoose.connection.once('open', () => {
// 	console.log('Connected to database');
// });

// mongoose.connection.on('error', () => {
// 	 console.error.bind(console, 'MongoDB connection error:');
// });

const server = hapi.server({
	port : port,
	host : "192.168.3.25"
});

const init = async () => {
	server.route([
		{
			method 	: 'GET',
			path	: '/notice/news/recent',
			handler	: (request, reply) => {
				return {	
						"op": true,
						"msg": "",
						"data" :[  
						   {  
						      "id": "23658",
						      "tittle": "Tite gets called in this Monday and has 27 days of preparation for debut",
						      "description": "The right absences are Casemiro and Marcelo of Real Madrid and Roberto Firmino of Liverpool, who will play in the Champions League final",
						      "url_img": "https://via.placeholder.com/150",
						      "link": "https://www.otempo.com.br/superfc/tite-recebe-convocados-nesta-segunda-e-tem-27-dias-de-prepara%C3%A3o-A -estreia-1.1789078",
						      "origin": "Otempo.com.br",
						      "category": "sports",
						      "date": "2018-05-21 11:37:50"
						   },
						   {  
						      "id": "23670",
						      "tittle": "Technician in scolding, incredible chance lost ... and Gold still celebrates goal",
						      "description": "Web has fun with Flamengo striker memes celebrating a goal that was not worth, while another coach loses his job at the Brasileirão",
						      "url_img": "https://via.placeholder.com/150",
						      "link": "https://globoesporte.globo.com/futebol/brasileirao-serie-a/noticia/tecnico-na-bronca-chance-incrivel-perdida-e-dourado-ainda-festeja-gol.ghtml",
						      "origin": "Globe",
						      "category": "sports",
						      "date": "2018-05-21 11:03:24"
						   },
						   {  
						      "id": "23671",
						      "tittle": "Corinthians sets schedule of returns and spared for games against Millonarios and Internacional",
						      "description": "Corinthians has already defined the schedule regarding the use of holders and reserves in the two matches of the week - receives Millionarios-COL, by Libertadores, and travels to face Internacional.",
						      "url_img": "https://via.placeholder.com/150",
						      "link": "https://www.meutimao.com.br/noticias-do-corinthians/288853/corinthians-define-record-of-reviews-and-poppates-for-games-contra-millonarios-e-internacional",
						      "origin": "Meutimao.com.br",
						      "category": "sports",
						      "date": "2018-05-21 10:55:02"
						   },
						   {  
						      "id": "23673",
						      "tittle": "Adversary of Brazil in preparation for the World Cup, Croatia is called",
						      "Description": "Croatia is one more selection to announce its final call for the World Cup on Monday, or nearly so Displaying a read.",
						      "url_img": "https://via.placeholder.com/150",
						      "link": "https://www.terra.com.br/esportes/croacia/adversaria-do-brasil-na-preparacao-para-a-copa-croacia-e-convocada,a7e2dfc588c35b45fde0db441a80ad81y2a1fk3m.html",
						      "origin": "Terra.com.br",
						      "category": "sports",
						      "date": "2018-05-21 10:40:48"
						   }
						]
					};
			}
		},
		{
			method 	: 'GET',
			path	: '/notice/news/{category}/{page}',
			handler	: (request, reply) => {
				return {	
						"op": true,
						"msg": "",
						"data":{
							"pages" : 2002,
							"page" : 1,
							"news" : [
							   {  
							      "id": "23658",
							      "tittle": "Tite gets called in this Monday and has 27 days of preparation for debut ,",
							      "description": "The right absences are Casemiro and Marcelo of Real Madrid and Roberto Firmino of Liverpool, who will play in the Champions League final",
							      "url_img": "https://via.placeholder.com/150",
							      "link": "https://www.otempo.com.br/superfc/tite-recebe-convocados-nesta-segunda-e-tem-27-dias-de-prepara%C3%A3o-A -estreia-1.1789078",
							      "origin": "Otempo.com.br",
							      "category": "sports",
							      "date": "2018-05-21 11:37:50"
							   },
							   {  
							      "id": "23670",
							      "tittle": "Technician in scolding, incredible chance lost ... and Gold still celebrates goal",
							      "description": "Web has fun with Flamengo striker memes celebrating a goal that was not worth, while another coach loses his job at the Brasileirão",
							      "url_img": "https://via.placeholder.com/150",
							      "link": "https://globoesporte.globo.com/futebol/brasileirao-serie-a/noticia/tecnico-na-bronca-chance-incrivel-perdida-e-dourado-ainda-festeja-gol.ghtml",
							      "origin": "Globe",
							      "category": "sports",
							      "date": "2018-05-21 11:03:24"
							   },
							   {  
							      "id": "23671",
							      "tittle": "Corinthians sets schedule of returns and spared for games against Millonarios and Internacional",
							      "description": "Corinthians has already defined the schedule regarding the use of holders and reserves in the two matches of the week - receives Millionarios-COL, by Libertadores, and travels to face Internacional.",
							      "url_img": "https://via.placeholder.com/150",
							      "link": "https://www.meutimao.com.br/noticias-do-corinthians/288853/corinthians-define-record-of-reviews-and-poppates-for-games-contra-millonarios-e-internacional",
							      "origin": "Meutimao.com.br",
							      "category": "sports",
							      "date": "2018-05-21 10:55:02"
							   },
							   {  
							      "id": "23673",
							      "tittle": "Adversary of Brazil in preparation for the World Cup, Croatia is called",
							      "Description": "Croatia is one more selection to announce its final call for the World Cup on Monday, or nearly so Displaying a read.",
							      "url_img": "https://via.placeholder.com/150",
							      "link": "https://www.terra.com.br/esportes/croacia/adversaria-do-brasil-na-preparacao-para-a-copa-croacia-e-convocada,a7e2dfc588c35b45fde0db441a80ad81y2a1fk3m.html",
							      "origin": "Terra.com.br",
							      "category": "sports",
							      "date": "2018-05-21 10:40:48"
							   }
						]
						}
					};
			}
		},
		{
			method 	: 'GET',
			path	: '/notice/search/{search}',
			handler	: (request, reply) => {
				return {	
						"op": true,
						"msg": "",
						"data":[  
						   {  
						      "id": "23658",
						      "tittle": "Tite gets called in this Monday and has 27 days of preparation for debut ,",
						      "description": "The right absences are Casemiro and Marcelo of Real Madrid and Roberto Firmino of Liverpool, who will play in the Champions League final",
						      "url_img": "https://via.placeholder.com/150",
						      "link": "https://www.otempo.com.br/superfc/tite-recebe-convocados-nesta-segunda-e-tem-27-dias-de-prepara%C3%A3o-A -estreia-1.1789078",
						      "origin": "Otempo.com.br",
						      "category": "sports",
						      "date": "2018-05-21 11:37:50"
						   },
						   {  
						      "id": "23670",
						      "tittle": "Technician in scolding, incredible chance lost ... and Gold still celebrates goal",
						      "description": "Web has fun with Flamengo striker memes celebrating a goal that was not worth, while another coach loses his job at the Brasileirão",
						      "url_img": "https://via.placeholder.com/150",
						      "link": "https://globoesporte.globo.com/futebol/brasileirao-serie-a/noticia/tecnico-na-bronca-chance-incrivel-perdida-e-dourado-ainda-festeja-gol.ghtml",
						      "origin": "Globe",
						      "category": "sports",
						      "date": "2018-05-21 11:03:24"
						   },
						   {  
						      "id": "23671",
						      "tittle": "Corinthians sets schedule of returns and spared for games against Millonarios and Internacional",
						      "description": "Corinthians has already defined the schedule regarding the use of holders and reserves in the two matches of the week - receives Millionarios-COL, by Libertadores, and travels to face Internacional.",
						      "url_img": "https://via.placeholder.com/150",
						      "link": "https://www.meutimao.com.br/noticias-do-corinthians/288853/corinthians-define-record-of-reviews-and-poppates-for-games-contra-millonarios-e-internacional",
						      "origin": "Meutimao.com.br",
						      "category": "sports",
						      "date": "2018-05-21 10:55:02"
						   },
						   {  
						      "id": "23673",
						      "tittle": "Adversary of Brazil in preparation for the World Cup, Croatia is called",
						      "Description": "Croatia is one more selection to announce its final call for the World Cup on Monday, or nearly so Displaying a read.",
						      "url_img": "https://via.placeholder.com/150",
						      "link": "https://www.terra.com.br/esportes/croacia/adversaria-do-brasil-na-preparacao-para-a-copa-croacia-e-convocada,a7e2dfc588c35b45fde0db441a80ad81y2a1fk3m.html",
						      "origin": "Terra.com.br",
						      "category": "sports",
						      "date": "2018-05-21 10:40:48"
						   }
						]
					};
			}
		},
		{
			method 	: 'GET',
			path	: '/',
			handler	: (request, reply) => {
				return `PONG`
			}
		},
		{
			method 	: 'GET',
			path	: '/api/v1/travels',
			handler	:  (request, reply) => {
				return Travel.find();
			},
			config: {
				description: 'Get all travels.',
				tags: ['api', 'v1', 'painting']
			}
		},
		{
			method 	: 'GET',
			path	: '/api/v1/travel/{id}',
			handler	:  (request, reply) => {
				return Travel.findOne(request.id);
			},
			config: {
				description: 'Get one travel data',
				tags: ['api', 'v1', 'data']
			}
		},
		{
			method 	: 'POST',
			path	: '/api/v1/travels',
			handler	: (request, reply) => {
				const {name, tips_travel, images, address, postal_code, phone_number, lat, lot } = request.payload;
				const travel = new Travel({
					name,
					images,
					url : slug(name),
					address,
					postal_code,
					phone_number,
					coordinate : {
						lat,
						lot
					}
				});

				return travel.save();
			},
			config: {
				description: 'Post a destionations.',
				tags: ['api', 'v1'],
				plugins: {
		            'hapi-swagger': {
		                payloadType: 'form'
		            }
		        },
		        validate: {
		            payload: Joi.object({
		                name	: Joi.string().required().description('Name of the destinations'),
		                tips_travel : Joi.string(),
		                images : Joi.string().required().description('Put link of the images'),
		                address	: Joi.string().required().description('Address of the destinations'),
		                postal_code	: Joi.string().required().description('Postal Code of the destinations'),
		                phone_number: Joi.string().required().description('Phone Number of the destinations'),
						lat : Joi.string().required(),
						lot : Joi.string().required()
		            })
		        }
			}
		},
		{
			method 	: 'GET',
			path	: '/api/v1/opentrips',
			handler	:  (request, reply) => {
				return Opentrip.find();
			}
		},
		{
			method 	: 'GET',
			path	: '/api/v1/opentrip/{id}',
			handler	:  (request, reply) => {
				return Opentrip.findOne(request.id);
			}
		},
		{
			method 	: 'POST',
			path	: '/api/v1/opentrips',
			handler	: (request, reply) => {
				const {name, place, coordinate} = request.payload;
				const opentrip = new Opentrip({
					name,
					url : slug(name),
					place,
					coordinate : {
						lat, lot
					}
				});

				return opentrip.save();
			}
		},
		{
			method : 'GET',
	        path   : '/bucket',
	        async handler(request) {
	            const { s3 } = request.server;
	            const buckets = await s3.listBuckets();
	          	return buckets;
        	}
		}


	]);
	await server.register([
		Inert,
		Vision,
		{
			plugin  : HapiSwagger,
	        options : {
	            info : {
	            	'title' : "Travel Pathravel API Documentation",
	            	'version' : Pack.version
	            }
	        }	
		},
		{
	        plugin  : s3,
	        options : {
	            publicKey : process.env.AWS_ACCESS_KEY_ID,
	            secretKey : process.env.AWS_SECRET_ACCESS_KEY,
	            bucket : process.env.AWS_BUCKET
	        }
    	}]
    );
	await server.start();
	console.log(`Server running at ${server.info.uri}`);
};

init();
