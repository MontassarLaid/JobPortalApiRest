var mongoose = require('../db').mongoose;
var Schema   = mongoose.Schema;

var categorySchema = new Schema({
	'id' : {type : Number,index:true, unique: true,required: true },
	'name' : String
});

module.exports = mongoose.model('category', categorySchema);
