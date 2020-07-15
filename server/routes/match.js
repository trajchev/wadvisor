const express = require('express');
const auth = require('../auth');
const { matchCtrl } = require('../controllers');
const router = express.Router({mergeParams: true});

router.use(auth.protect);
router.use(auth.restrictTo('admin', 'pro', 'beginner'));

router.route('/:league')
    .get(matchCtrl.getMatches);

router.route('/:league/:id')
    .get(matchCtrl.getMatch)

router.route('/:league/:id/h2h')
    .get(matchCtrl.getMatchH2H);

router.use(auth.restrictTo('pro'));
router.route('/:league/:id/spreads')
    .get(matchCtrl.getMatchSpreads);

router.route('/:league/:id/totals')
    .get(matchCtrl.getMatchTotals);

module.exports = router;
