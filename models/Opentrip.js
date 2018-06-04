const mongoose 	= require('mongoose');
const Schema	= mongoose.Schema;

const OpentripSchema = new Schema({
	name	: String,
	url 	: String,
	place	: String,
	price	: Number
});

module.exports = mongoose.model('Opentrip', OpentripSchema);