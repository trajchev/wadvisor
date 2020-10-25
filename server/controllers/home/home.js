const { Match, H2H } = require('../../models');
const { read } = require('../../services');

const readHomeMatches = read.readAll(Match, [
  { model: H2H, as: "h2hs", attributes: ['odds_home', 'odds_away', 'odds_draw']}
], [['commence_time', 'DESC']], 10);

module.exports = {

    readHomeMatches

};
