const { Group, Sport} = require('../../models');
const { read } = require('../../services');

const getLeagues = read.readAllSports(Group, [{
  model: Sport,
  attributes: ['key', 'active', 'details', 'title']
}], ['title']);

module.exports = {
    getLeagues
};
