const express = require('express');
// const auth = require('../auth');
const { faqCtrl } = require('../controllers');
const router = express.Router();

router.get('/', faqCtrl.getFAQs);
// router.use(auth.protect);
// router.use(auth.restrictTo('admin'));
router.post('/', faqCtrl.createFAQ);
router.route('/:id')
    .get(faqCtrl.getFAQ)
    .patch(faqCtrl.updateFAQ)
    .delete(faqCtrl.deleteFAQ);

module.exports = router;
