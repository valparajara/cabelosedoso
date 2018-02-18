const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const campanhas = new Schema({
    campanha: String,
    itens: [String],
    ativo: Boolean
},{collection: 'campanhas'});

// Cria o model a partir do schema
const CampanhaModel = mongoose.model('CampanhaModel', campanhas );
/*
campanha: {
    nome: 'campanha 1',
    itens: ['maça','pera','cabeloslisos','rosas']
}
*/

module.exports = CampanhaModel;