const httpStatus = require('http-status-codes');
const CampanhaModel = require('../models/campanha');
const inspect = require('eyes').inspector();

const campanhaCreate = (req, res, next) => {
    const campanhaNome = req.body.campanha;
    const listaItens = req.body.campanha.itens;
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


exports.incluir = campanhaCreate;
exports.encerrar = campanhaEncerrar;
exports.listar = campanhaListar;
exports.ativar = campanhaAtivar;