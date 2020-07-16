const express = require('express');
const { leagueCtrl } = require('../controllers');
const auth = require('../auth');
const router = express.Router();

router.use(auth.protect);

router.get('/', leagueCtrl.getLeagues);
router.get('/:group', leagueCtrl.getLeagues);

module.exports = router;
