const { Match, Site, H2H, Spreads, Totals } = require("../../models");
const { read } = require('../../services');

// const getMatches = read.readAll(Match);
const getMatches = read.readAll(Match, [
  { model: H2H, as: "h2hs", attributes: ['odds_home', 'odds_away', 'odds_draw']}
], [['commence_time', 'DESC']], 40);

const getMatch = read.read(Match, [
  { model: H2H, as: "h2hs", include: Site }
]);
const getMatchH2H = read.read(Match, [
  { model: H2H, as: "h2hs", attributes: ['odds_home', 'odds_away', 'odds_draw'], include: [{ model: Site, attributes: ['key', 'name', 'logo', 'region']}] },
]);
const getMatchSpreads = read.read(Match, [
  { model: Spreads, as: "spreads", include: [{ model: Site }] },
]);
const getMatchTotals = read.read(Match, [
  { model: Totals, as: "totals", include: [{ model: Site }] },
]);

module.exports = {
  getMatches,
  getMatch,
  getMatchH2H,
  getMatchSpreads,
  getMatchTotals,
};
