var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var accountSchema = new Schema({

module.exports = mongoose.model('account', accountSchema);