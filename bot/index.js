const socket = require('socket.io')(3333);
const request = require('request');
const Twitter = require('node-tweet-stream');
const moment = require('moment');
const inspect = require('eyes').inspector();
const URL_BACKEND_CAMPANHA = 'http://localhost:3000/campanha';
const URL_BACKEND_TWEETS = 'http://localhost:3000/tweets';
const twitter_stream = new Twitter({
  consumer_key: 'Dw7cNFzw18jolhJaAhbpuAmOi',
  consumer_secret: 'BLhUDI3SgqMMohqGNltRiQrRgcCjTi27QKE1SfywR0lZvd84zH',
  token: '8495522-dbUAPvlEqh4QXydg0hwp0dyOhaOwjBpAsWYsAkgLDb',
  token_secret: 'oG0Q5us9IlOuoJB04zMtkaDv19VCDGohznLeTiW57rOHZ'
});

const TweetModel = require('../models/tweets');
const CampanhaModel = require('../models/campanha');

request.get(URL_BACKEND_CAMPANHA, function (error, response, body) {

  if (error) throw new Error('Erro ao conectar ao Backend');

  let campanhaAtiva = JSON.parse(body);
  let campanhaId    = campanhaAtiva[0].id;
  let campanhaNome    = campanhaAtiva[0].campanha;
  let palavras_chaves = campanhaAtiva[0].itens;
  

  // Debug
  // inspect(campanhaAtiva);
  inspect(campanhaId,"Campanha id:");
  inspect(campanhaNome,"Campanha nome:");
  inspect(palavras_chaves,"Campanha palavras chaves:");

  // quando achar dispara esse evento
  twitter_stream.on('tweet', function (tweet) {
    let data = {
        data: tweet.created_at,
        id: tweet.id,
        text: tweet.text
    }

    const regexHashs = /#[A-Za-z]{2,20}/g;
    let hashs = data.text.match(regexHashs);
    let itemSelecionado = hashs[1];

    //colocando o item selecionado dentro do objeto
    data.item = itemSelecionado;

    inspect(data);

    // Dispara evento do Socket.io para o front
    disparaEventoFront(data);
    
    // Debug
    inspect(data.data, 'data do tweet');
    inspect(moment(new Date(data.data)).format(), 'data do tweet');
    inspect(data.id, 'id do tweet');
    inspect(data.text, 'texto do tweet');

    insereDadosTweet({ id_tweet:data.id, id_campanha:campanhaId, texto:data.text, data:data.data, item:itemSelecionado});

  });
    // Trackeando as hashtags
    trackHashtagTwitter(palavras_chaves)
  });


  const insereDadosTweet = ({ id_tweet, id_campanha, texto, data, item}) => {
    // request.post({url:'http://service.com/upload', form: {key:'value'}}, function(err,httpResponse,body){ /* ... */ })
    request.post({
      url:URL_BACKEND_TWEETS, 
      form:{
        id_campanha: id_campanha,
        texto_tweet: texto,
        data_tweet: data,
        item_tweet: item
      }
    }, function (error, response, body) {
    });
  }

twitter_stream.on('error', function (err) {
  console.log('Oh no')
})

// // track(retornaCampanhaAtiva());

const trackHashtagTwitter = (itens) =>{
  itens.map((cada_item) => {
    twitter_stream.track(cada_item);
  })
}

const disparaEventoFront = (data) => {
  // Dispara evento do Socket.io para o front
  socket.emit('tweet', data);
} 


