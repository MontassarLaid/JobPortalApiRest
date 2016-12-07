var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var accountSchema = new Schema({	'lastname' : String,	'firstname' : String,	'birthday' : Date,	'email' : String,	'password' : String,	'role' : String});

module.exports = mongoose.model('account', accountSchema);
