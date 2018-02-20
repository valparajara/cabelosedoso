const httpStatus = require('http-status-codes');
const TweetsModel = require('../models/tweets');
const inspect = require('eyes').inspector();

const tweetCreate = (req, res, next) => {
    
    const id = req.body.id;
    const id_campanha = req.body.id_campanha;
    const texto_tweet = req.body.texto_tweet;
    const data_tweet = req.body.data_tweet;
    const item_tweet = req.body.item_tweet;

    TweetsModel.create({ id_tweet: id, id_campanha: id_campanha, texto: texto_tweet, data: data_tweet, item: item_tweet}, (err, ret) => {
        if (err) throw new Error({'erro':'Erro ao incluir dados'});
        if (!err){
            res.status(httpStatus.CREATED);
            res.end();
        }
      });
}

exports.incluir = tweetCreate;
