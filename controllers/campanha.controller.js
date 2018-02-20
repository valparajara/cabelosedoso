const httpStatus = require('http-status-codes');
const TweetsModel = require('../models/tweets');
const moment = require('moment');
const _ = require('lodash');
const inspect = require('eyes').inspector();

const campanhaCreate = (req, res, next) => {
    const campanhaNome = req.body.campanha;
    const listaItens = req.body.itens.split(',');
    CampanhaModel.create({ campanha: campanhaNome, itens: listaItens, ativo: false}, (err, ret) => {
        if (err) throw new Error({'erro':'Erro ao incluir dados'});
        if (!err){
            res.status(httpStatus.CREATED);
            res.end();
        }
      });
}
const campanhaEncerrar = (req, res, next) => {
    const id = req.params.id;
    CampanhaModel.findById(id, (err, doc) => {
        if (err) throw new Error({'erro':'Erro ao desativar dados'});
        doc.ativo = false;
        doc.save();
        res.status(httpStatus.NO_CONTENT);
        res.end();
    });
}   
const campanhaAtivar = (req, res, next) => {
    const id = req.params.id;
    CampanhaModel.findById(id, (err, doc) => {
        if (err) throw new Error({'erro':'Erro ao desativar dados'});
        doc.ativo = true;
        doc.save();
        res.status(httpStatus.NO_CONTENT);
        res.end();
    });
}
const campanhaListar = (req, res, next) => {  
    CampanhaModel.find({ ativo: true}).exec((err, doc) => {
        if (err) throw new Error({'erro':'Erro ao listar dados'});
        if (!err){
            let retorno = doc.map((cada_campanha) => {
                return { id: cada_campanha._id,
                            campanha: cada_campanha.campanha,
                            itens: cada_campanha.itens
                }
            });
            res.status(httpStatus.CREATED);
            res.status(httpStatus.OK).json(retorno);
        }
        });
}

const campanhaRelatorio = (req, res, next) => { 
    // parseInt(moment(new Date(doc[0].data)).format("HH"))
    TweetsModel.find({}).exec((err, doc) => {
        let _dados = [];
        if (err) throw new Error({'erro':'Erro ao listar dados'});
        if (!err){
            let _resposta = _.countBy(doc,(data) => moment(new Date(data.data)).format("HH"));
            Object.entries(_resposta).forEach(([key, value]) => {
                _dados.push({hora: key, total: value})   
            });
            res.status(httpStatus.CREATED);
            res.status(httpStatus.OK).json(_dados);
        }
        });
}

exports.incluir = campanhaCreate;
exports.encerrar = campanhaEncerrar;
exports.listar = campanhaListar;
exports.relatorio = campanhaRelatorio;
exports.ativar = campanhaAtivar;