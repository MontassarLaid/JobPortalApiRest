var mongoose = require('../db').mongoose;
var Schema   = mongoose.Schema;

var companySchema = new Schema({
    'id' : {type : Number,index:true, unique: true,required: true },
	'name' : String,
	'location' : String
});

module.exports = mongoose.model('company', companySchema);
