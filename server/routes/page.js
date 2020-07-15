const express = require('express');

const auth = require('../auth');
const { pageCtrl } = require('../controllers');

const router = express.Router();

router.get('/', pageCtrl.getPages);
router.get('/:slug', pageCtrl.getPage);

router.use(auth.protect);
router.use(auth.restrictTo('admin'));
router.post('/', pageCtrl.createPage);
router.patch('/:id', pageCtrl.updatePage);

module.exports = router;
