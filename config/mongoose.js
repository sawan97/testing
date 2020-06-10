const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/testing_development');

const db = mongoose.connection;

db.on('error',console.error.bind(console,"error in connecting the db"));

db.once('open',function(){
    console.log('connected to Database::MongoDB');
});

module.exports = db;
