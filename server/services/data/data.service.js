const axios = require('axios');
const BAError = require('../../utils/BAError');
const { Group, Sport} = require('../../models');

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

module.exports = {
  getSports
}
