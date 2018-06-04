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
		lat : {type : String},
		lot : {type : String},
	},
	place: [String]
});

module.exports = mongoose.model('Travel', TravelSchema);