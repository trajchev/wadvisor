const express = require('express');
const { homeCtrl } = require('../controllers');
const router = express.Router();

router.get('/', homeCtrl.readHomeMatches);

module.exports = router;
