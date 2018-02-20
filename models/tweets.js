const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tweets = new Schema({
    id: Number,
    campanha: String,
    texto: String,
    data: Date,
    item: String,
},{collection: 'tweets'});

// Cria o model a partir do schema
const TweetModel = mongoose.model('TweetModel', tweets );
/*
campanha: {
    nome: 'campanha 1',
    itens: ['maça','pera','cabeloslisos','rosas']
}
*/

module.exports = TweetModel;