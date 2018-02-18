const socket = require('socket.io')(3333);
const Twitter = require('node-tweet-stream');
const t = new Twitter({
  consumer_key: 'Dw7cNFzw18jolhJaAhbpuAmOi',
  consumer_secret: 'BLhUDI3SgqMMohqGNltRiQrRgcCjTi27QKE1SfywR0lZvd84zH',
  token: '8495522-dbUAPvlEqh4QXydg0hwp0dyOhaOwjBpAsWYsAkgLDb',
  token_secret: 'oG0Q5us9IlOuoJB04zMtkaDv19VCDGohznLeTiW57rOHZ'
});

const CampanhaModel = require('../models/campanha');
const inspect = require('eyes').inspector();

t.on('tweet', function (tweet) {
  let data = {
      data: tweet.created_at,
      id: tweet.id,
      text: tweet.text,
      source: tweet.source
  }
  socket.emit('tweet', data);

  inspect(data.data, 'data do tweet');
  inspect(data.id, 'id do tweet');
  inspect(data.text, 'texto do tweet');
  inspect(data.source, 'source do tweet');

const retornaCampanhaAtiva = () => {
  CampanhaModel.find({ ativo: true}).exec((err, doc) => {
    if (err) throw new Error({'erro':'Erro'});
    if (!err){
        let retorno = doc.map((cada_campanha) => {
            return( { id: cada_campanha._id,
                     campanha: cada_campanha.campanha,
                     itens: cada_campanha.itens
            })
        });
        return retorno.itens;
    }
  })
}

})

t.on('error', function (err) {
  console.log('Oh no')
})

track(retornaCampanhaAtiva());

const track = (itens) =>{
  itens.map((cada_item) => {
    t.track(cada_item);
  })
}

// t.track('MaisShampooSedoso #maça');
// t.track('MaisShampooSedoso #maça');
// t.track('MaisShampooSedoso #maça');
// t.track('MaisShampooSedoso #maça');

