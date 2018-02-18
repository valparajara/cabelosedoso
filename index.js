const express = require('express');
const path = require('path');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const inspect = require('eyes').inspector();

const app = express();

//Set up default mongoose connection
const mongoDB = 'mongodb://127.0.0.1:27017/cabelos';

mongoose.connect(mongoDB);

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Routers
const campanha = require('./routers/campanhas');


// Associando
app.use('/campanha', campanha);

app.listen(app.get('port'), function() {
  inspect(app.get('port'),'Cabelo Sedoso Backend listening on port ');
});

module.exports = app;