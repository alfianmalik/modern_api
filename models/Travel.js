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
		temp: {type : String, default: 0},
		pressure: {type : String, default: 0},
		humidity: String,
		temp_min: {type : String, default: 0},
		temp_max: {type : String, default: 0},
		visibility: String,
		wind: {
			speed: {type : String, default: 0},
			deg: {type : String, default: 0},
		},
		coord: {
			lon	: {type : String, default: 0},
			lat : {type : String, default: 0}
		}
	},
	place: [String],
	tips_travel : String,
	deleted_at: Date,
	updated_at: Date,
	created_at: { 
		type : Date,
		default: Date.now
	}
});

/**
 * [exports description]
 * @type {[type]}
 */
module.exports = mongoose.model('Travel', TravelSchema);