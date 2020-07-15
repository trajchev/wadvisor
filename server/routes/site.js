const express = require('express');
const auth = require('../auth');
const { siteCtrl } = require('../controllers');
const router = express.Router();

router.use(auth.protect);
router.use(auth.restrictTo('admin'));

router.get('/', siteCtrl.getSites);
router.get('/:id', siteCtrl.getSite);
router.patch('/:id', siteCtrl.updateSite);

module.exports = router;
