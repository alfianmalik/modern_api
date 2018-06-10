const mongoose 	= require('mongoose');
const Schema	= mongoose.Schema;

function toLower (v) {
  	return v.toLowerCase();
}

const TravelSchema = new Schema({
	name: { type: String },
	url : { type: String, set: toLower },
	images : [String],
	coordinate : {
		lat : {type : String, default: 0},
		lot : {type : String, default: 0},
	},
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
	place: [String]
});

module.exports = mongoose.model('Travel', TravelSchema);