const hapi = require('hapi');
const mongoose = require('mongoose');
const s3 = require('hapi-s3');
const slug = require('slug');
const Travel = require('./models/Travel');
const Opentrip = require('./models/Opentrip');

/* swagger section */
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');

const port = process.env.PORT || 4000;
require('dotenv').config();

mongoose.connect('mongodb://localhost:27017/pathravel', function(err) {
			if (err) {
                console.log('MongoDB connection error');
                process.exit(1);
            }
		});
// mongoose.connect(`mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@ds141320.mlab.com:41320/pathravel`);

mongoose.connection.once('open', () => {
	console.log('Connected to database');
});

mongoose.connection.on('error', () => {
	 console.error.bind(console, 'MongoDB connection error:');
});

const server = hapi.server({
	port : port,
	host : 'localhost'
});

const init = async () => {
	server.route([
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
			}
		},
		{
			method 	: 'GET',
			path	: '/api/v1/travel/{id}',
			handler	:  (request, reply) => {
				return Travel.findOne(request.id);
			}
		},
		{
			method 	: 'POST',
			path	: '/api/v1/travels',
			handler	: (request, reply) => {
				const {name, place, lat } = request.payload;
				const travel = new Travel({
					name,
					url : slug(name),
					lat,
					lot
				});

				return travel.save();
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
