const mongoose = require('mongoose');
const config = require('./env');

mongoose.Promise = global.Promise;

mongoose.connect(config.dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var connection = mongoose.connection
    .once('open', () => { console.log(`Connection with Mongo started on: ${config.dbUrl}`) })
    .on('error', (error) => console.error(error.toString()));

module.exports = connection;