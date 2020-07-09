const express = require('express');
const auth = require('../auth');
const { ticketCtrl, betmatchCtrl } = require('../controllers');
const router = express.Router({mergeParams: true});

router.use(auth.protect);

router.get('/', ticketCtrl.getTickets);
router.get('/light', ticketCtrl.getTicketsLight);
router.get('/:id', ticketCtrl.getTicket);
router.post('/match', betmatchCtrl.betmatch);
router.delete('/match/:id', betmatchCtrl.removeBetmatch);
router.patch('/:id', ticketCtrl.updateTicket);
router.patch('/tip/:id', betmatchCtrl.updateTip);
router.post('/', ticketCtrl.createTicket);
router.delete('/:id', ticketCtrl.deleteTicket);

module.exports = router;
