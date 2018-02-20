const express = require('express');
const router = express.Router();

const campanha_controller = require('../controllers/campanha.controller.js');

// Criação de campanha
router.get('/', campanha_controller.listar);
router.post('/', campanha_controller.incluir);
router.put('/encerrar/:id', campanha_controller.encerrar);
router.put('/ativar/:id', campanha_controller.ativar);

module.exports = router;