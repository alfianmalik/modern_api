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
 * [TravelSchema]
 * @type {Schema}
 */
const TravelSchema = new Schema({
	name: { type: String },
	url : { type: String, set: toLower },
	images : [String],
	address: String,
	postal_code : String,
	phone_number : String,
	coordinate : {
		lat : {type : String, default: 0},
		lot : {type : String, default: 0},
	},
	category : Number,
	weather : {
		temp: String,
		pressure: String,
		humidity: String,
		temp_min: String,
		temp_max: String,
		visibility: String,
		wind: {
			speed: String,
			deg: String
		},
		coord: {
			lon	: {type : String, default: 0},
			lat : {type : String, default: 0}
		}
	},
	place: [String],
	tips_travel : String,
	deleted_at: String,
	updated_at: String,
	created_at: String

});

/**
 * [exports description]
 * @type {[type]}
 */
module.exports = mongoose.model('Travel', TravelSchema);