const leagueCtrl = require('./league/league');
const siteCtrl = require('./site/site');
const teamCtrl = require('./team/team');
const matchCtrl = require('./match/match');
const userCtrl = require('./user/user');
const faqCtrl = require('./faq/faq');
const ticketCtrl = require('./ticket/ticket');
const betmatchCtrl = require('./betmatch/betmatch');
const pageCtrl = require('./page/page');
const homeCtrl = require('./home/home');

module.exports = { leagueCtrl, matchCtrl, userCtrl, siteCtrl, pageCtrl, homeCtrl, teamCtrl, faqCtrl, ticketCtrl, betmatchCtrl};
