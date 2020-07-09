const express = require('express');
const auth = require('../auth');
const { teamCtrl } = require('../controllers');
const router = express.Router();

router.use(auth.protect);
router.use(auth.restrictTo('admin'));

router.get('/', teamCtrl.getTeams);
router.get('/:id', teamCtrl.getTeam);
router.patch('/:id', teamCtrl.uploadTeamLogo, teamCtrl.updateTeam);

module.exports = router;
