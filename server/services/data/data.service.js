const axios = require('axios');
const schedule = require('node-schedule');
const BAError = require('../../utils/BAError');
const saveData = require('./save.service');
const catchAsync = require('../../utils/catch-async');

const { Group, Sport, Match, Site} = require('../../models');

// Fetch All sports from API
const getSports = () => {
  axios.get(`${process.env.API_URL}sports`, {
    params: { api_key: process.env.API_KEY }
  }).then(response => {

    // Store groups in db
    response.data.data.forEach(dataObj => {
      Group.findOrCreate({where: {
        title: dataObj.group
      }});
    });

    response.data.data.forEach(dataObj => {
      Sport.findOrCreate({where: {
        key: dataObj.key,
        active: dataObj.active || false,
        group_title: dataObj.group,
        details: dataObj.details.replace(/[^0-9a-z- ]/gi, ''),
        title: dataObj.title,
      }}).then(([sport, created]) => {
        if (created) {
          Group.findOrCreate({where: {
              title: sport.group_title
          }});
        }
      }).catch(err => {
        return new BAError(err);
      });
    })
  });
};

const getOdds = (sport, region, type) => {
  axios.get(`${process.env.API_URL}odds`, {
    params: {
        api_key: process.env.API_KEY,
        sport: sport,
        region: region,
        mkt: type
    }
  })
  .then(response => {
    response.data.data.forEach(matchObj => {
      saveData.checkSaveTeam(matchObj);

      Match.findOrCreate({where: {
        home_team: matchObj.teams[0],
        away_team: matchObj.teams[1],
        commence_time: matchObj.commence_time
      }, defaults: {sport_key: matchObj.sport_key}}).then(([match, created]) => {
        if (matchObj.sites.length > 0) {
          matchObj.sites.forEach(siteObj => {
            Site.findOrCreate({where: {key: siteObj.site_key}, defaults: {
              name: siteObj.site_nice, region: region }
            }).then(([site, created]) => {
              switch(type) {
                case 'h2h':
                  saveData.checkSaveH2H(siteObj, match, site.id);
                  break;
                case 'spreads':
                  saveData.checkSaveSpreads(siteObj, match, site.id);
                  break;
                case 'totals':
                  saveData.checkSaveTotals(siteObj, match, site.id);
                  break;
                default:
                  saveData.checkSaveH2H(siteObj, match, site.id);
              }

              return site;
            }).catch(err => new BAError(err));
          })
        }
        return match;
      }).catch(err => new BAError(err))
    });
  }).catch(err => new BAError(err))
}

const getSportsRecurring = catchAsync(async () => {
  const rule = new schedule.RecurrenceRule();
  rule.month = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  rule.hour = 0;
  rule.minute = 0;

  const s = schedule.scheduleJob(rule, getSports);

});

const getOddsRecurring = catchAsync( async () => {
  const rule = new schedule.RecurrenceRule();
  rule.dayOfWeek = new schedule.Range(0,6)
  rule.hour = 16;
  rule.minute = 45;

  const sports = await Sport.findAll({attributes: ['key']});
  const regions = ['au', 'uk', 'us', 'eu'];
  const markets = ['h2h', 'spreads', 'totals'];

  const j = schedule.scheduleJob(rule, () => {
    sports.forEach((sport, sidx) => {
      setTimeout( async () => {
        markets.forEach((market, midx) => {
          setTimeout(async () => {
            regions.forEach((region, ridx) => {
              setTimeout(async () => {
                getOdds(sport, region, market);
              }, ridx * 3000)
            })
          }, midx * 13000);
        })
      }, sidx * 53000);
    });
  })
});

module.exports = {
  getSportsRecurring, getOddsRecurring
}
