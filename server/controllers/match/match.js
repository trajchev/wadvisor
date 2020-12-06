const { Match, Site, H2H, Spreads, Totals } = require("../../models");
const { read } = require('../../services');

// const getMatches = read.readAll(Match);
const getMatches = read.readAll(Match, [
  { model: H2H, as: "h2hs", attributes: ['odds_home', 'odds_away', 'odds_draw']}
], [['commence_time', 'DESC']], 40);

const getMatch = read.read(Match);
const getMatchH2H = read.read(Match, [
  { model: H2H, as: "h2hs", attributes: ['odds_home', 'odds_away', 'odds_draw'], include: [{ model: Site, attributes: ['key', 'name', 'logo', 'region']}] },
]);
const getMatchSpreads = read.read(Match, [
  { model: Spreads, as: "spreads", attributes: ['odds_home', 'odds_away', 'points_home', 'points_away'], include: [{ model: Site }] },
]);
const getMatchTotals = read.read(Match, [
  { model: Totals, as: "totals", attributes: ['odds_home', 'odds_away', 'points_home', 'points_away'], include: [{ model: Site }] },
]);

module.exports = {
  getMatches,
  getMatch,
  getMatchH2H,
  getMatchSpreads,
  getMatchTotals,
};
