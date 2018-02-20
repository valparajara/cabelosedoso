const express = require('express');
const router = express.Router();

const tweets_controller = require('../controllers/tweets.controller.js');

// Criação de campanha
router.post('/', tweets_controller.incluir);

module.exports = router;