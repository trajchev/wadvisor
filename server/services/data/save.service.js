const { Team, Totals, Spreads, H2H} = require('../../models');

const checkSaveTotals = ( siteObj, matchResult, siteID ) => {

    Totals.findOrCreate({where: {match_id: matchResult.id, site_id: siteID}, defaults: {
        type: 'totals',
        position_over: siteObj.odds.totals.position[0],
        position_under: siteObj.odds.totals.position[1],
        odds_home: siteObj.odds.totals.odds[0],
        odds_away: siteObj.odds.totals.odds[1],
        points_home: siteObj.odds.totals.points[0],
        points_away: siteObj.odds.totals.points[1],
    }}).then(([total, created]) => total).catch(err => new Error(err));

};

const checkSaveSpreads = ( siteObj, matchResult, siteID ) => {

    Spreads.findOrCreate({where: {match_id: matchResult.id, site_id: siteID}, defaults: {
        type: 'spreads',
        odds_home: siteObj.odds.spreads.odds[0],
        odds_away: siteObj.odds.spreads.odds[1],
        points_home: siteObj.odds.spreads.points[0] * 1,
        points_away: siteObj.odds.spreads.points[1] * 1,
    }}).then(([spread, created]) => spread).catch(err => new Error(err));

};

const checkSaveH2H = ( siteObj, matchResult, siteID) => {

  if (siteObj.odds.h2h.length === 2) {
    return H2H.findOrCreate({where: {match_id: matchResult.id, site_id: siteID}, defaults: {
      type: 'h2h',
      odds_home: siteObj.odds.h2h[0],
      odds_draw: 0,
      odds_away: siteObj.odds.h2h[1]
    }}).then(([h2h, created]) => h2h).catch(err => new Error(err));
  }

  return H2H.findOrCreate({where: {match_id: matchResult.id, site_id: siteID}, defaults: {
      type: 'h2h',
      odds_home: siteObj.odds.h2h[0],
      odds_draw: siteObj.odds.h2h[1],
      odds_away: siteObj.odds.h2h[2]
  }}).then(([h2h, created]) => h2h).catch(err => new Error(err));

};

const checkSaveTeam = matchObj => {

    matchObj.teams.forEach(teamName => {

        Team.findOrCreate({where: {name: teamName}, defaults: {
            sport_name: matchObj.sport_nice.replace(/[^0-9a-z- ]/gi, ''),
            sport_key: matchObj.sport_key
        }}).then(([team, created]) => team).catch(err => new Error(err));
    });

};

module.exports = {

    checkSaveTotals,
    checkSaveSpreads,
    checkSaveH2H,
    checkSaveTeam

}
