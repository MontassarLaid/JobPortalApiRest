var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:admin@ds129028.mlab.com:29028/jobportaldb');

//mongodb://127.0.0.1/JobPortal
var db = mongoose.connection;
db.on('error',function(error){
    console.log('******** Erreur Mongoose **********');
    console.log(error);
    console.log('******** Erreur Mongoose **********');
});

db.on('open',function(){
    console.log('******** IS OPEN server *********');
});

exports.mongoose = mongoose;