const Sequelize = require('sequelize');
const { Match, Site, H2H, Spreads, Totals } = require("../../models");
const { read } = require('../../services');

// const getMatches = read.readAll(Match);
const getMatches = read.readMatches(Match, [
  { model: H2H, as: "h2hs", attributes: ['odds_home', 'odds_away', 'odds_draw']}
]);

const getMatch = read.readAssociated(Match, [
  { model: H2H, as: "h2hs", include: Site }
]);
const getMatchH2H = read.readAssociated(Match, [
  { model: H2H, as: "h2hs", include: [{ model: Site }] },
]);
const getMatchSpreads = read.readAssociated(Match, [
  { model: Spreads, as: "spreads", include: [{ model: Site }] },
]);
const getMatchTotals = read.readAssociated(Match, [
  { model: Totals, as: "totals", include: [{ model: Site }] },
]);

module.exports = {
  getMatches,
  getMatch,
  getMatchH2H,
  getMatchSpreads,
  getMatchTotals,
};
