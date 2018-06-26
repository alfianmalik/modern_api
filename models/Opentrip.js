const mongoose 	= require('mongoose');
const Schema	= mongoose.Schema;

/**
 * [toLower description]
 * @param  {[type]} v [description]
 * @return {[type]}   [description]
 */
function toLower (v) {
  	return v.toLowerCase();
}

/**
 * [OpentripSchema description]
 * @type {Schema}
 */
const OpentripSchema = new Schema({
	name	: String,
	url 	: String,
	place	: String,
	images : [String],
	phone_number : String,
	coordinate : {
		lat : {type : String, default: 0},
		lot : {type : String, default: 0},
	},
	price	: Number,
	category : Number,
	deleted_at: String,
	updated_at: String,
	created_at: String
});

/**
 * [exports description]
 * @type {[type]}
 */
module.exports = mongoose.model('Opentrip', OpentripSchema);